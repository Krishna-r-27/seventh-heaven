namespace Seventh_Heaven_LLC.Server.DTOs
{
    // Returned after login or register — sent to frontend
    public class AuthUserResponse
    {
        public int UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string Role { get; set; } = string.Empty;
    }

    // PUT /api/auth/profile
    public class UpdateProfileRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
    }

    // PUT /api/auth/change-password
    public class ChangePasswordRequest
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}