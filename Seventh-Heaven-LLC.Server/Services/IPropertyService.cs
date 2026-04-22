using System.Collections.Generic;
using System.Threading.Tasks;
using Seventh_Heaven_LLC.Server.Controllers;
using Seventh_Heaven_LLC.Server.DTOs; // DTOs (CreatePropertyRequest, UpdatePropertyRequest, PropertyImageDto, PropertyResponse)

namespace Seventh_Heaven_LLC.Server.Services
{
    public interface IPropertyService
    {
        Task<IEnumerable<PropertyResponse>> GetAllAsync();
        Task<PropertyResponse?> GetByIdAsync(int id);
        Task<PropertyResponse> CreateAsync(CreatePropertyRequest request);
        Task InsertPropertyImageAsync(Controllers.PropertyImageDto img, int propertyId);
        Task<PropertyResponse?> UpdateAsync(int id, UpdatePropertyRequest request);
        Task<bool> DeleteAsync(int id);

        /// <summary>
        /// Toggle the ShowOnHomepage flag for the property. Returns true when update succeeded.
        /// </summary>
        Task<bool> ToggleShowOnHomepageAsync(int id);
    }
}