using Seventh_Heaven_LLC.Server.Repositories;
using Seventh_Heaven_LLC.Server.Models;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.Controllers;

namespace Seventh_Heaven_LLC.Server.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DAL _dal;

        public PropertyRepository(DAL dal)
        {
            _dal = dal;
        }

        public async Task<IEnumerable<Property>> GetAllAsync()
        {
            var sql = "SELECT * FROM Properties ORDER BY SortOrder, Title";
            var properties = (await _dal.QueryAsync<Property>(sql)).ToList();
            if (properties.Count == 0)
            {
                return properties;
            }

            var sqlImages = "SELECT * FROM PropertyImages ORDER BY SortOrder";
            var allImages = await _dal.QueryAsync<PropertyImage>(sqlImages);
            var imagesByPropertyId = allImages
                .GroupBy(img => img.PropertyId)
                .ToDictionary(
                    group => group.Key,
                    group => group
                        .OrderBy(img => img.SortOrder)
                        .ToList());

            foreach (var property in properties)
            {
                if (imagesByPropertyId.TryGetValue(property.Id, out var images))
                {
                    property.Images = images;
                }
            }

            return properties;
        }

        public async Task<Property?> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Properties WHERE Id = @Id";
            var items = await _dal.QueryAsync<Property>(sql, new { Id = id });

            var sqlImages = "SELECT * FROM PropertyImages WHERE PropertyId = @Id ORDER BY SortOrder";
            var images = await _dal.QueryAsync<PropertyImage>(sqlImages, new { Id = id });
            var property = items.FirstOrDefault();
            if (property != null)
            {
                property.Images = images.ToList();
            }
            return property;
        }

        public async Task<Property?> GetBySlugAsync(string slug)
        {
            var sql = "SELECT * FROM Properties WHERE Id = @Id";
            var items = await _dal.QueryAsync<Property>(sql, new { Slug = slug });
            return items.FirstOrDefault();
        }

        public async Task<int> CreateAsync(Property property)
        {
            var shiftSql = "UPDATE Properties SET SortOrder = SortOrder + 1";
            await _dal.ExecuteAsync(shiftSql);

            var sql = @"INSERT INTO Properties (title, Description, PropertyType, Guestrooms, Bedrooms, Bathrooms,Amenities,LocationLink,HouseRules,CancellationPolicy,ShowOnHomepage,IsVisible,SortOrder,ShortLocation,NearestLocation,FurnishingStatus)
                        VALUES (@title, @Description, @PropertyType, @Guestrooms, @Bedrooms, @Bathrooms,@Amenities,@LocationLink,@HouseRules,@CancellationPolicy,@ShowOnHomepage,@IsVisible,1,@ShortLocation,@NearestLocation,@FurnishingStatus);
                        SELECT LAST_INSERT_ID();";
            return await _dal.ExecuteScalarAsync<int>(sql, property);
        }

        public async Task<bool> UpdateAsync(Property property)
        {
            var sql = @"UPDATE Properties
                        SET title=@title, Description=@Description, PropertyType=@PropertyType,
                            Guestrooms=@Guestrooms, Bedrooms=@Bedrooms, Bathrooms=@Bathrooms,
                            Amenities=@Amenities, LocationLink=@LocationLink, HouseRules=@HouseRules,
                            CancellationPolicy=@CancellationPolicy, IsVisible=@IsVisible, ShowOnHomepage = @ShowOnHomepage,
                            ShortLocation=@ShortLocation, NearestLocation=@NearestLocation, FurnishingStatus=@FurnishingStatus
                        WHERE Id=@Id";
            var rows = await _dal.ExecuteAsync(sql, property);
            return rows > 0;
        }        

        public async Task<bool> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Properties WHERE Id = @Id";
            var rows = await _dal.ExecuteAsync(sql, new { Id = id });
            return rows > 0;
        }

        public async Task<bool> ToggleShowOnHomepageAsync(int id)
        {
            var sql = @"UPDATE Properties
                        SET ShowOnHomepage=@ShowOnHomepage
                        WHERE Id=@Id";
            var rows = await _dal.ExecuteAsync(sql, new { Id = id, ShowOnHomepage = true });
            return rows > 0;
        }

        public async Task InsertPropertyImageAsync(Controllers.PropertyImageDto img, int propertyId)
        {
            if (img == null) throw new ArgumentNullException(nameof(img));

            const string insertSql = @"
                INSERT INTO PropertyImages (PropertyId, ImageUrl, ImageWebpUrl, IsPrimary, SortOrder)
                VALUES (@PropertyId, @ImageUrl, @ImageWebpUrl, @IsPrimary, @SortOrder);
                SELECT LAST_INSERT_ID();";

            var newId = await _dal.ExecuteScalarAsync<int>(insertSql, new
            {
                PropertyId = propertyId,
                ImageUrl = img.ImageUrl,
                ImageWebpUrl = img.ImageWebpUrl,
                IsPrimary = img.IsPrimary ? 1 : 0,
                SortOrder = img.SortOrder
            });

            // optional: populate Id back on DTO
            img.Id = newId;
        }

        public async Task SetPrimaryImageAsync(int propertyId, int imageId)
        {
            const string resetSql = "UPDATE PropertyImages SET IsPrimary = 0 WHERE PropertyId = @PropertyId;";
            await _dal.ExecuteAsync(resetSql, new { PropertyId = propertyId });

            const string setSql = "UPDATE PropertyImages SET IsPrimary = 1 WHERE PropertyId = @PropertyId AND Id = @ImageId;";
            await _dal.ExecuteAsync(setSql, new { PropertyId = propertyId, ImageId = imageId });
        }

        public async Task UpdateImageSortOrderAsync(int imageId, int sortOrder)
        {
            const string sql = "UPDATE PropertyImages SET SortOrder = @SortOrder WHERE Id = @ImageId;";
            await _dal.ExecuteAsync(sql, new { ImageId = imageId, SortOrder = sortOrder });
        }

        public async Task<PropertyImage?> GetImageByIdAsync(int imageId)
        {
            const string sql = "SELECT * FROM PropertyImages WHERE Id = @Id";
            return (await _dal.QueryAsync<PropertyImage>(sql, new { Id = imageId })).FirstOrDefault();
        }

        public async Task<bool> DeleteImageAsync(int imageId)
        {
            const string sql = "DELETE FROM PropertyImages WHERE Id = @Id";
            var rows = await _dal.ExecuteAsync(sql, new { Id = imageId });
            return rows > 0;
        }
    }
}