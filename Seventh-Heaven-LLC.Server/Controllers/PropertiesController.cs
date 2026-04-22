using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seventh_Heaven_LLC.Server.Services; // adjust namespace to your project
using Seventh_Heaven_LLC.Server.Models;   // adjust for your DTOs/Models

namespace Seventh_Heaven_LLC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        private readonly ImageStorageService _imageStorage;

        public PropertiesController(IPropertyService propertyService, ImageStorageService imageStorage)
        {
            _propertyService = propertyService;
            _imageStorage = imageStorage;
        }

        // GET /api/properties — public
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _propertyService.GetAllAsync();
            return Ok(list);
        }

        // GET /api/properties/{id} — public
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var prop = await _propertyService.GetByIdAsync(id);
            if (prop == null) return NotFound();
            return Ok(prop);
        }

        // POST /api/properties — admin only
        // Expects multipart/form-data:
        // - "payload" => JSON (CreatePropertyRequest)
        // - "files" => uploaded images (optional, multiple)
        // - "primaryIndex" => index (0-based) indicating which image to mark primary (optional)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CreatePropertyRequest request, [FromForm] IFormFileCollection? files)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required.");

            var images = new List<PropertyImageDto>();

            if (files != null && files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    var f = files[i];
                    if (f != null && f.Length > 0)
                    {
                        var pair = await _imageStorage.SaveImageAsync(f, "properties");
                        images.Add(new PropertyImageDto
                        {
                            ImageUrl = pair.originalPath,
                            ImageWebpUrl = pair.webpPath
                        });
                    }
                }
            }

            // If primary not set and we have images, mark first
            if (!images.Any(i => i.IsPrimary) && images.Count > 0)
                images[0].IsPrimary = true;

            request.Images = images;

            var created = await _propertyService.CreateAsync(request);

            // Persist image records into PropertyImages table (link to created property)
            if (images != null && images.Count > 0)
            {                
                foreach (var img in images)
                {
                    PropertyImageDto pimg = new PropertyImageDto
                    {
                        ImageUrl = img.ImageUrl,
                        ImageWebpUrl = img.ImageWebpUrl,
                        IsPrimary = img.IsPrimary
                    };
                    // use 1/0 for IsPrimary to be DB-friendly
                    await _propertyService.InsertPropertyImageAsync(pimg, created.Id);
                }
            }

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT /api/properties/{id} — admin only
        // Expects multipart/form-data:
        // - "payload" => JSON (UpdatePropertyRequest)
        // - "files" => new uploaded images (optional)
        // - "primaryIndex" => index (0-based) in combined existing+new list to mark primary
        // - "existingImageIds" => JSON array of image ids to keep (optional)
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdatePropertyRequest request, [FromForm] IFormFileCollection? files)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required.");

            var existing = await _propertyService.GetByIdAsync(id);
            if (existing == null) return NotFound();

            // Determine which existing images to keep
            var keepIds = (request.ExistingImageIds ?? Enumerable.Empty<int>()).ToHashSet();

            // existing.Images is expected to be non-null (PropertyResponse.Images is non-nullable)
            var existingImages = existing.Images;

            var keptExistingImages = existingImages
                                        .Where(img => keepIds.Contains(img.Id))
                                        .Select(img => new PropertyImageDto
                                        {
                                            Id = img.Id,
                                            ImageUrl = img.ImageUrl,
                                            ImageWebpUrl = img.ImageWebpUrl,
                                            IsPrimary = false // will set later
                                        })
                                        .ToList();

            // Delete images that are not kept
            var toDelete = existingImages
                            .Where(img => !keepIds.Contains(img.Id))
                            .ToList();

            foreach (var d in toDelete)
            {
                try
                {
                    _imageStorage.DeleteImagePair(d.ImageWebpUrl, d.ImageUrl);
                }
                catch
                {
                    // ignore deletion errors — service should log
                }
            }

            // Save new files (if any)
            var newImages = new List<PropertyImageDto>();
            if (files != null && files.Count > 0)
            {
                for (int i = 0; i < files.Count; i++)
                {
                    var f = files[i];
                    if (f != null && f.Length > 0)
                    {
                        var pair = await _imageStorage.SaveImageAsync(f, "properties");
                        newImages.Add(new PropertyImageDto
                        {
                            ImageUrl = pair.originalPath,
                            ImageWebpUrl = pair.webpPath,
                            IsPrimary = false
                        });
                    }
                }
            }

            // Combine kept existing images (first) then new images
            var combined = new List<PropertyImageDto>();
            combined.AddRange(keptExistingImages);
            combined.AddRange(newImages);

            // mark primary based on provided PrimaryIndex
            if (request.PrimaryIndex.HasValue)
            {
                var pi = request.PrimaryIndex.Value;
                if (pi >= 0 && pi < combined.Count)
                {
                    for (int i = 0; i < combined.Count; i++)
                        combined[i].IsPrimary = (i == pi);
                }
            }

            // If none marked primary but we have images, ensure first is primary
            if (!combined.Any(i => i.IsPrimary) && combined.Count > 0)
                combined[0].IsPrimary = true;

            request.Images = combined;

            var updated = await _propertyService.UpdateAsync(id, request);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // PATCH /api/properties/{id}/toggle-homepage — admin only
        [HttpPatch("{id:int}/toggle-homepage")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleHomepage(int id)
        {
            var ok = await _propertyService.ToggleShowOnHomepageAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE /api/properties/{id} — admin only
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _propertyService.GetByIdAsync(id);
            if (existing == null) return NotFound();

            // existing.Images is non-nullable in DTO; iterate directly
            foreach (var img in existing.Images)
            {
                try
                {
                    _imageStorage.DeleteImagePair(img.ImageWebpUrl, img.ImageUrl);
                }
                catch
                {
                    // ignore
                }
            }

            var deleted = await _propertyService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }

    #region DTOs used by controller

    // Minimal DTO for creating a property. Adjust/add validation attributes as needed.
    public class CreatePropertyRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PropertyType { get; set; }
        public int Guestrooms { get; set; } = 1;
        public int Bedrooms { get; set; } = 1;
        public int Bathrooms { get; set; } = 1;
        public IEnumerable<string>? Amenities { get; set; }
        public string? LocationLink { get; set; }
        public string? HouseRules { get; set; }
        public string? CancellationPolicy { get; set; }
        public bool ShowOnHomepage { get; set; }
        public bool IsVisible { get; set; }
        public int SortOrder { get; set; }

        // Filled by controller from saved files
        public IEnumerable<PropertyImageDto>? Images { get; set; }
    }

    public class UpdatePropertyRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PropertyType { get; set; }
        public int Guestrooms { get; set; } = 1;
        public int Bedrooms { get; set; } = 1;
        public int Bathrooms { get; set; } = 1;
        public IEnumerable<string>? Amenities { get; set; }
        public string? LocationLink { get; set; }
        public string? HouseRules { get; set; }
        public string? CancellationPolicy { get; set; }
        public bool ShowOnHomepage { get; set; }
        public bool IsVisible { get; set; }
        public int SortOrder { get; set; }

        // Ids of existing images the client wants to keep (server will delete others)
        public IEnumerable<int>? ExistingImageIds { get; set; }

        // Primary index in combined (kept existing + newly uploaded) images list
        public int? PrimaryIndex { get; set; }

        // Controller will populate with resulting images before calling service
        public IEnumerable<PropertyImageDto>? Images { get; set; }
    }

    public class PropertyImageDto
    {
        public int Id { get; set; } // for existing images
        public string? ImageUrl { get; set; }
        public string? ImageWebpUrl { get; set; }
        public bool IsPrimary { get; set; }
    }

    #endregion
}