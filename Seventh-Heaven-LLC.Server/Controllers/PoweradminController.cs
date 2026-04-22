using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.DTOs;
using Seventh_Heaven_LLC.Server.Models;
using Seventh_Heaven_LLC.Server.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Seventh_Heaven_LLC.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoweradminController : ControllerBase
    {
        private readonly DAL _dal;
        private readonly IJwtService _jwtService;
        private readonly IEmailService _email;
            
        public PoweradminController(DAL dal, IJwtService jwtService, IEmailService email)
        {
            _dal = dal;
            _jwtService = jwtService;
            _email = email;
        }

        /// <summary>
        /// Sign In — returns a JWT for an admin user.
        /// </summary>
        /// <remarks>
        /// Usage:
        /// 1. POST /api/Poweradmin/signin with JSON body: { "Email": "admin@seventh.com", "Password": "P@ssw0rd" }
        /// 2. Response contains a bearer token: { "token": "eyJ...", "user": { "UserId": 1, "Email": "...", "Role": "Admin" } }
        ///
        /// Example curl:
        /// curl -X POST "https://localhost:7176/api/Poweradmin/signin" \
        ///  -H "Content-Type: application/json" \
        ///  -d '{"email":"admin@seventh.com","password":"P@ssw0rd"}'
        ///
        /// The returned token must be included in Authorization header for endpoints that require authentication:
        /// Authorization: Bearer &lt;token&gt;
        /// </remarks>
        [AllowAnonymous]
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginModel login)
        {
            var sql = "SELECT UserId, Email, PasswordHash, Role FROM Users WHERE Email=@Email";
            var user = (await _dal.QueryAsync<UserModel>(sql, new { login.Email })).FirstOrDefault();

            if (user == null)
                return Unauthorized(new { message = "No such user exists." });

            if (!BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials." });

            // Role gate — only Admin accounts may use this signin endpoint
            if (user.Role != "Admin")
                return Unauthorized(new { message = "Access denied. This login is for administrators only." });

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token, user = new { user.UserId, user.Email, user.Role } });
        }

        // Explicit HTTP method + authorization required (prevents Swagger "Ambiguous HTTP method" error)
        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] AdminChangePasswordRequest request)
        {
            // 1. Identify the calling admin from JWT
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId))
                return Unauthorized(new { message = "Invalid token or user id." });

            // If this JWT was issued via OTP verify, allow changing password without verifying current password.
            var isPwdReset = string.Equals(User.FindFirstValue("pwdReset"), "true", StringComparison.OrdinalIgnoreCase);

            // 2. Validate request fields
            if (string.IsNullOrWhiteSpace(request.CurrentPassword) && !isPwdReset)
                return BadRequest(new { message = "Current password is required." });

            if (string.IsNullOrWhiteSpace(request.NewPassword) || request.NewPassword.Length < 6)
                return BadRequest(new { message = "New password must be at least 6 characters." });

            if (request.NewPassword != request.ConfirmPassword)
                return BadRequest(new { message = "New password and confirm password do not match." });

            // 3. Fetch current hash from DB
            var users = await _dal.QueryAsync<UserModel>(
                "SELECT UserId, PasswordHash FROM Users WHERE UserId = @UserId AND Role = 'Admin'",
                new { UserId = userId });

            var user = users.FirstOrDefault();
            if (user == null)
                return NotFound(new { message = "Admin account not found." });

            // 4. Verify current password
            if (!isPwdReset)
            {
                if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
                    return BadRequest(new { message = "Current password is incorrect." });
            }

            // 5. Hash and save the new password
            var newHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            await _dal.ExecuteAsync(
                "UPDATE Users SET PasswordHash = @PasswordHash WHERE UserId = @UserId",
                new { PasswordHash = newHash, UserId = userId });

            return Ok(new { message = "Password updated successfully." });
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var email = (request.Email ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { message = "Email is required." });

            var user = (await _dal.QueryAsync<UserModel>(
                "SELECT UserId, Email, Role FROM Users WHERE Email=@Email",
                new { Email = email })).FirstOrDefault();

            // Always return 200 to avoid user enumeration
            if (user == null || user.Role != "Admin")
                return Ok(new { message = "If the email exists, an OTP has been sent." });

            var otp = new Random().Next(100000, 999999).ToString();
            var otpHash = BCrypt.Net.BCrypt.HashPassword(otp);
            var expires = DateTime.UtcNow.AddMinutes(10);

            await _dal.ExecuteAsync(
                @"INSERT INTO AdminPasswordOtps (Email, OtpHash, ExpiresAtUtc, CreatedAtUtc, Attempts)
                  VALUES (@Email, @OtpHash, @ExpiresAtUtc, @CreatedAtUtc, 0)",
                new
                {
                    Email = email,
                    OtpHash = otpHash,
                    ExpiresAtUtc = expires,
                    CreatedAtUtc = DateTime.UtcNow
                });

            await _email.SendAdminOtpAsync(email, otp);

            return Ok(new { message = "If the email exists, an OTP has been sent." });
        }

        [AllowAnonymous]
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] AdminVerifyOtpRequest request)
        {
            var email = (request.Email ?? string.Empty).Trim();
            var otp = (request.Otp ?? string.Empty).Trim();

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(otp))
                return BadRequest(new { message = "Email and OTP are required." });

            var user = (await _dal.QueryAsync<UserModel>(
                "SELECT UserId, Email, Role FROM Users WHERE Email=@Email",
                new { Email = email })).FirstOrDefault();

            if (user == null || user.Role != "Admin")
                return Unauthorized(new { message = "Invalid OTP." });

            var rows = await _dal.QueryAsync<dynamic>(
                @"SELECT Id, OtpHash, ExpiresAtUtc, UsedAtUtc, Attempts
                  FROM AdminPasswordOtps
                  WHERE Email=@Email AND UsedAtUtc IS NULL AND ExpiresAtUtc >= UTC_TIMESTAMP()
                  ORDER BY Id DESC
                  LIMIT 5",
                new { Email = email });

            long? matchedId = null;
            foreach (var r in rows)
            {
                string hash = r.OtpHash;
                if (BCrypt.Net.BCrypt.Verify(otp, hash))
                {
                    matchedId = (long)r.Id;
                    break;
                }
            }

            if (matchedId == null)
            {
                // increment attempts on latest row if exists (best-effort)
                var latest = rows.FirstOrDefault();
                if (latest != null)
                    await _dal.ExecuteAsync("UPDATE AdminPasswordOtps SET Attempts = Attempts + 1 WHERE Id=@Id", new { Id = (long)latest.Id });

                return Unauthorized(new { message = "Invalid or expired OTP." });
            }

            await _dal.ExecuteAsync(
                "UPDATE AdminPasswordOtps SET UsedAtUtc=@UsedAtUtc WHERE Id=@Id",
                new { UsedAtUtc = DateTime.UtcNow, Id = matchedId });

            // Issue a short-lived admin token that allows password change without current password verification.
            var token = _jwtService.GeneratePasswordResetToken(user, durationMinutes: 15);
            return Ok(new { token, user = new { user.UserId, user.Email, user.Role } });
        }
    }
}
