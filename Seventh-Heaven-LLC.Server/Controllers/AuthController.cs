using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.DTOs;
using Seventh_Heaven_LLC.Server.Models;
using Seventh_Heaven_LLC.Server.Services;
using System.Security.Claims;


namespace Seventh_Heaven_LLC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DAL _dal;
        private readonly JwtService _jwtService;
        private readonly IEmailService _email;
        private readonly IConfiguration _config;

        // ── Helpers ────────────────────────────────────────────────────────
        private int GetUserId()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(id, out var uid) ? uid : 0;
        }

        // ── POST /api/auth/forgot-password ─────────────────────────────────
        // Always returns 200 to avoid user enumeration.
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var email = (request.Email ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { message = "Email is required." });

            var users = await _dal.QueryAsync<UserModel>(
                "SELECT UserId, Email, Role FROM Users WHERE Email = @Email",
                new { Email = email });

            var user = users.FirstOrDefault();
            if (user == null || user.Role == "Admin")
                return Ok(new { message = "If the email exists, a reset link has been sent." });

            var rawToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray())
                .Replace("+", "-").Replace("/", "_").TrimEnd('=');
            var tokenHash = BCrypt.Net.BCrypt.HashPassword(rawToken);
            var expires = DateTime.UtcNow.AddMinutes(30);

            await _dal.ExecuteAsync(
                @"INSERT INTO PasswordResetTokens (UserId, TokenHash, ExpiresAtUtc, CreatedAtUtc)
                  VALUES (@UserId, @TokenHash, @ExpiresAtUtc, @CreatedAtUtc)",
                new
                {
                    UserId = user.UserId,
                    TokenHash = tokenHash,
                    ExpiresAtUtc = expires,
                    CreatedAtUtc = DateTime.UtcNow
                });

            var baseUrl = _config["App:FrontendBaseUrl"] ?? "http://localhost:56341";
            var resetLink = $"{baseUrl.TrimEnd('/')}/reset-password?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(rawToken)}";

            await _email.SendPasswordResetLinkAsync(email, resetLink);

            return Ok(new { message = "If the email exists, a reset link has been sent." });
        }

        // ── PUT /api/auth/change-password ─────────────────────────────────
        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var userId = GetUserId();
            if (userId == 0) return Unauthorized();

            var users = await _dal.QueryAsync<UserModel>(
                "SELECT UserId, Email, PasswordHash, Role FROM Users WHERE UserId = @UserId",
                new { UserId = userId });

            var user = users.FirstOrDefault();
            if (user == null) return NotFound(new { message = "User not found." });

            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
                return BadRequest(new { message = "Current password is incorrect." });

            if (string.IsNullOrWhiteSpace(request.NewPassword) || request.NewPassword.Length < 6)
                return BadRequest(new { message = "New password must be at least 6 characters." });

            var newHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            await _dal.ExecuteAsync(
                "UPDATE Users SET PasswordHash = @PasswordHash WHERE UserId = @UserId",
                new { PasswordHash = newHash, UserId = userId });

            return Ok(new { message = "Password updated successfully." });
        }
    }
}
