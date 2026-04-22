using Seventh_Heaven_LLC.Server.Models;

namespace Seventh_Heaven_LLC.Server.Services
{
    public interface IJwtService
    {
        string GenerateToken(UserModel user);
        string GeneratePasswordResetToken(UserModel user, int durationMinutes);
    }
}
