using Microsoft.AspNetCore.Mvc;
using Seventh_Heaven_LLC.Server.Data;

namespace Seventh_Heaven_LLC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyListingsController : ControllerBase
    {
        private readonly DAL _dal;
        private readonly IWebHostEnvironment _env;

        public PropertyListingsController(DAL dal, IWebHostEnvironment env)
        {
            _dal = dal;
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePropertyListingRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.FirstName))
                    return BadRequest(new { message = "First name is required." });
                if (string.IsNullOrWhiteSpace(request.LastName))
                    return BadRequest(new { message = "Last name is required." });
                if (string.IsNullOrWhiteSpace(request.Phone))
                    return BadRequest(new { message = "Phone number is required." });
                if (string.IsNullOrWhiteSpace(request.Email))
                    return BadRequest(new { message = "Email is required." });

                const string sql = @"
                INSERT INTO PropertyListingRequests
                (
                    FirstName,
                    LastName,
                    Phone,
                    Email,
                    City,
                    PropertyType,
                    Rooms,
                    Bathrooms,
                    MaxGuests,
                    Amenities,
                    Address,
                    Details,
                    CreatedAt
                )
                VALUES
                (
                    @FirstName,
                    @LastName,
                    @Phone,
                    @Email,
                    @City,
                    @PropertyType,
                    @Rooms,
                    @Bathrooms,
                    @MaxGuests,
                    @Amenities,
                    @Address,
                    @Details,
                    UTC_TIMESTAMP()
                );
                SELECT LAST_INSERT_ID();";

                var id = await _dal.ExecuteScalarAsync<int>(sql, new
                {
                    FirstName = request.FirstName.Trim(),
                    LastName = request.LastName.Trim(),
                    Phone = request.Phone.Trim(),
                    Email = request.Email.Trim(),
                    City = request.City?.Trim(),
                    PropertyType = request.PropertyType?.Trim(),
                    Rooms = request.Rooms?.Trim(),
                    Bathrooms = request.Bathrooms?.Trim(),
                    MaxGuests = request.MaxGuests?.Trim(),
                    Amenities = request.Amenities?.Trim(),
                    Address = request.Address?.Trim(),
                    Details = request.Details?.Trim()
                });

                // Handle image upload saving (save each as row in PropertyListingImages table, referencing the PropertyListingRequest Id)
                if (request.Images != null && request.Images.Count > 0)
                {
                    const string imgSql = @"
                    INSERT INTO PropertyListingImages
                        (PropertyListingRequestId, FileName, ContentType, Data)
                    VALUES
                        (@PropertyListingRequestId, @FileName, @ContentType, @Data);";

                    foreach (var img in request.Images)
                    {
                        // Each img: (FileName, ContentType, Base64Data)
                        if (!string.IsNullOrEmpty(img.Base64Data))
                        {
                            var base64 = img.Base64Data.Contains(",")
                                ? img.Base64Data.Split(',')[1]
                                : img.Base64Data;

                            byte[] bytes;
                            try
                            {
                                bytes = Convert.FromBase64String(base64);
                            }
                            catch
                            {
                                // Skip invalid base64 image payloads
                                continue;
                            }

                            var ext = Path.GetExtension(img.FileName ?? string.Empty);
                            if (string.IsNullOrWhiteSpace(ext))
                            {
                                ext = img.ContentType?.ToLowerInvariant() switch
                                {
                                    "image/png" => ".png",
                                    "image/webp" => ".webp",
                                    "image/jpeg" => ".jpg",
                                    "image/jpg" => ".jpg",
                                    _ => ".jpg"
                                };
                            }

                            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
                            var folder = Path.Combine(webRoot, "uploads", "property-listings");
                            Directory.CreateDirectory(folder);

                            var generatedName = $"{Guid.NewGuid():N}{ext}";
                            var filePath = Path.Combine(folder, generatedName);
                            await System.IO.File.WriteAllBytesAsync(filePath, bytes);
                            var relativePath = $"/uploads/property-listings/{generatedName}";

                            await _dal.ExecuteAsync(imgSql, new
                            {
                                PropertyListingRequestId = id,
                                FileName = img.FileName ?? generatedName,
                                ContentType = img.ContentType ?? "application/octet-stream",
                                Data = relativePath
                            });
                        }
                    }
                }

                return Ok(new { id, message = "Property listing request saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to save property listing request.",
                    error = ex.Message
                });
            }
        }
    }

    public class CreatePropertyListingRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? City { get; set; }
        public string? PropertyType { get; set; }
        public string? Rooms { get; set; }
        public string? Bathrooms { get; set; }
        public string? MaxGuests { get; set; }
        public string? Amenities { get; set; }
        public string? Address { get; set; }
        public string? Details { get; set; }
        public List<PropertyListingImageRequest> Images { get; set; } = new();
    }

    public class PropertyListingImageRequest
    {
        public string? FileName { get; set; }
        public string? ContentType { get; set; }
        public string? Base64Data { get; set; }
    }
}
