using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Seventh_Heaven_LLC.Server.Models;

namespace Seventh_Heaven_LLC.Server.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly double _durationInMinutes;


        public JwtService(IConfiguration config)
        {
            _config = config;
            _secretKey = config["Jwt:Secret"];
            _issuer = config["Jwt:Issuer"];
            _audience = config["Jwt:Audience"];
            _durationInMinutes = Convert.ToDouble(config["Jwt:DurationInMinutes"]);
        }

        public string GenerateToken(UserModel user)
        {
            var secret = _config["Jwt:Secret"] ?? throw new InvalidOperationException("JWT secret not configured");
            var issuer = _config["Jwt:Issuer"] ?? "seventh";
            var audience = _config["Jwt:Audience"] ?? "seventh_audience";
            var expiresMinutes = int.TryParse(_config["Jwt:ExpiresMinutes"], out var m) ? m : 60;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Short-lived token used only for password reset flows (admin OTP verify).
        // Short-lived token used only for password reset flows (admin OTP verify).
        public string GeneratePasswordResetToken(UserModel user, int durationMinutes = 15)
        {
            return GenerateTokenInternal(
                userId: user.UserId.ToString(),
                email: user.Email,
                role: user.Role,
                extraClaims: new Dictionary<string, string?> { ["pwdReset"] = "true" },
                durationMinutes: durationMinutes);
        }

        // ── NEW: validate a token that may already be expired ─────────────
        // graceMinutes: how many minutes past expiry we still accept.
        // This allows a user to click "Stay logged in" even if the token
        // expired seconds ago before they responded to the modal.
        public ClaimsPrincipal? ValidateExpiredToken(string token, int graceMinutes = 5)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _issuer,
                    ValidateAudience = true,
                    ValidAudience = _audience,
                    ValidateLifetime = true,
                    // Allow tokens expired within the grace window
                    ClockSkew = TimeSpan.FromMinutes(graceMinutes)
                }, out _);

                return principal;
            }
            catch
            {
                // Token is invalid or expired beyond the grace period
                return null;
            }
        }

        // ── NEW: issue a fresh token from existing claims (no DB lookup) ──
        public string GenerateTokenFromClaims(string userId, string email, string role)
        {
            return GenerateTokenInternal(userId, email, role, extraClaims: null, durationMinutes: _durationInMinutes);
        }

        private string GenerateTokenInternal(
            string userId,
            string email,
            string role,
            IDictionary<string, string?>? extraClaims,
            double durationMinutes)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Role, role)
            };

            if (extraClaims != null)
            {
                foreach (var kv in extraClaims)
                {
                    if (kv.Key is { Length: > 0 })
                        claims.Add(new Claim(kv.Key, kv.Value ?? string.Empty));
                }
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(durationMinutes),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
