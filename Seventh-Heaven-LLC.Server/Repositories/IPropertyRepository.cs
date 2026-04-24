using Seventh_Heaven_LLC.Server.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Seventh_Heaven_LLC.Server.Repositories
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetAllAsync();
        Task<Property?> GetByIdAsync(int id);
        Task<Property?> GetBySlugAsync(string slug);
        Task<int> CreateAsync(Property property);
        Task<bool> UpdateAsync(Property property);
        Task<bool> DeleteAsync(int id);
        Task<bool> ToggleShowOnHomepageAsync(int id);

        // Persist a single PropertyImage row for a property
        Task InsertPropertyImageAsync(Seventh_Heaven_LLC.Server.Controllers.PropertyImageDto img, int propertyId);
        Task SetPrimaryImageAsync(int propertyId, int imageId);
    }
}