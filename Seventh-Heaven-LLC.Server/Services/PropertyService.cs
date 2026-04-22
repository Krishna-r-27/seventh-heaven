using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seventh_Heaven_LLC.Server.DTOs;
using Seventh_Heaven_LLC.Server.Models;
using Seventh_Heaven_LLC.Server.Repositories;
using Seventh_Heaven_LLC.Server.Controllers;

namespace Seventh_Heaven_LLC.Server.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _repo;

        public PropertyService(IPropertyRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<PropertyResponse>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(MapToResponse);
        }

        public async Task<PropertyResponse?> GetByIdAsync(int id)
        {
            var property = await _repo.GetByIdAsync(id);
            return property == null ? null : MapToResponse(property);
        }

        public async Task<PropertyResponse> CreateAsync(CreatePropertyRequest request)
        {
            var property = new Property
            {
                Title = request.Title,
                Description = request.Description,
                PropertyType = request.PropertyType,
                Guestrooms = request.Guestrooms,
                Bedrooms = request.Bedrooms,
                Bathrooms = request.Bathrooms,
                Amenities = request.Amenities != null ? string.Join(",", request.Amenities) : null,
                LocationLink = request.LocationLink,
                HouseRules = request.HouseRules,
                CancellationPolicy = request.CancellationPolicy,
                ShowOnHomepage = request.ShowOnHomepage,
                IsVisible=request.IsVisible
            };

            // Add images
            if (request.Images != null && request.Images.Any())
            {
                foreach (var img in request.Images)
                {
                    property.Images.Add(new PropertyImage
                    {
                        ImageUrl = img.ImageUrl,
                        ImageWebpUrl = img.ImageWebpUrl,
                        IsPrimary = img.IsPrimary
                    });
                }
            }

            var id = await _repo.CreateAsync(property);
            property.Id = id;
            return MapToResponse(property);
        }

        public async Task InsertPropertyImageAsync(Seventh_Heaven_LLC.Server.Controllers.PropertyImageDto img, int propertyId)
        {
            if (img == null) throw new ArgumentNullException(nameof(img));

            // Repository expects the controller DTO type (PropertyImageDto in Controllers namespace).
            var repoDto = new Seventh_Heaven_LLC.Server.Controllers.PropertyImageDto
            {
                ImageUrl = img.ImageUrl,
                ImageWebpUrl = img.ImageWebpUrl,
                IsPrimary = img.IsPrimary
            };

            await _repo.InsertPropertyImageAsync(repoDto, propertyId);
        }

        public async Task<PropertyResponse?> UpdateAsync(int id, UpdatePropertyRequest request)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return null;

            existing.Title = request.Title ?? existing.Title;
            existing.Description = request.Description;
            existing.PropertyType = request.PropertyType;
            existing.Guestrooms = request.Guestrooms;
            existing.Bedrooms = request.Bedrooms;
            existing.Bathrooms = request.Bathrooms;
            existing.Amenities = request.Amenities != null ? string.Join(",", request.Amenities) : null;
            existing.LocationLink = request.LocationLink;
            existing.HouseRules = request.HouseRules;
            existing.CancellationPolicy = request.CancellationPolicy;
            existing.IsVisible = request.IsVisible;
            existing.ShowOnHomepage = request.ShowOnHomepage;
            existing.UpdatedAt = DateTime.UtcNow;

            // Update images
            if (request.Images != null)
            {
                existing.Images.Clear();
                foreach (var img in request.Images)
                {
                    existing.Images.Add(new PropertyImage
                    {
                        ImageUrl = img.ImageUrl,
                        ImageWebpUrl = img.ImageWebpUrl,
                        IsPrimary = img.IsPrimary
                    });
                }
            }

            await _repo.UpdateAsync(existing);
            return MapToResponse(existing);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<bool> ToggleShowOnHomepageAsync(int id)
        {
            return await _repo.ToggleShowOnHomepageAsync(id);
        }

        private static PropertyResponse MapToResponse(Property property) => new()
        {
            Id = property.Id,
            Title = property.Title,
            Description = property.Description,
            PropertyType = property.PropertyType,
            Guestrooms = property.Guestrooms,
            Bedrooms = property.Bedrooms,
            Bathrooms = property.Bathrooms,
            Amenities = (property.Amenities ?? string.Empty)
                .Split(',')
                .Where(a => !string.IsNullOrWhiteSpace(a))
                .Select(a => a.Trim())
                .ToList(),
            LocationLink = property.LocationLink,
            HouseRules = property.HouseRules,
            CancellationPolicy = property.CancellationPolicy,
            IsVisible = property.IsVisible,
            ShowOnHomepage = property.ShowOnHomepage,
            Images = property.Images
                .Select(img => new Seventh_Heaven_LLC.Server.DTOs.PropertyImageDto
                {
                    Id = img.Id,
                    ImageUrl = img.ImageUrl,
                    ImageWebpUrl = img.ImageWebpUrl,
                    IsPrimary = img.IsPrimary
                })
                .ToList(),
            CreatedAt = property.CreatedAt,
            UpdatedAt = property.UpdatedAt
        };
    }
}