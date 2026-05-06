using System;
using System.Collections.Generic;

namespace Seventh_Heaven_LLC.Server.DTOs
{
    public class PropertyImageDto
    {
        // Id is present for images persisted in the database; will be 0 for new images until saved.
        public int Id { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageWebpUrl { get; set; }
        public bool IsPrimary { get; set; }
    }

    public class PropertyResponse
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? PropertyType { get; set; }

        public int Guestrooms { get; set; } = 1;
        public string? Bedrooms { get; set; }
        public int Bathrooms { get; set; } = 1;

        // Amenities returned as a simple list of strings
        public IEnumerable<string> Amenities { get; set; } = new List<string>();

        public string? LocationLink { get; set; }
        public string? ShortLocation { get; set; }
        public string? NearestLocation { get; set; }
        public string? FurnishingStatus { get; set; }
        public string? HouseRules { get; set; }
        public string? CancellationPolicy { get; set; }

        public bool ShowOnHomepage { get; set; }
        public bool IsVisible { get; set; } 
        public int SortOrder { get; set; }

        // Images associated with the property
        public IEnumerable<PropertyImageDto> Images { get; set; } = new List<PropertyImageDto>();

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}