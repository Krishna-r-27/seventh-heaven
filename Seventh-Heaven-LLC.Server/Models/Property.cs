using System;
using System.Collections.Generic;

namespace Seventh_Heaven_LLC.Server.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? PropertyType { get; set; }

        public int Guestrooms { get; set; } = 1;
        public string? Bedrooms { get; set; } 
        public int Bathrooms { get; set; } = 1;

        public string? Amenities { get; set; } // stored as comma-separated or JSON
        public string? LocationLink { get; set; }
        public string? ShortLocation { get; set; }
        public string? NearestLocation { get; set; }
        public string? FurnishingStatus { get; set; }
        public string? HouseRules { get; set; }
        public string? CancellationPolicy { get; set; }

        public bool ShowOnHomepage { get; set; } = false;

        public bool IsVisible { get; set; } 
        public int SortOrder { get; set; }
        // Navigation
        public ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

    public class PropertyImage
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }

        public string ImageUrl { get; set; } = string.Empty;      // original path
        public string? ImageWebpUrl { get; set; }                  // webp version
        public bool IsPrimary { get; set; } = false;

        // Foreign key
        public Property? Property { get; set; }
    }
}