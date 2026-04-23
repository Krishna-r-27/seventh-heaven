using Microsoft.AspNetCore.Mvc;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.Services;

namespace Seventh_Heaven_LLC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactInquiriesController : ControllerBase
    {
        private readonly DAL _dal;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ContactInquiriesController> _logger;

        public ContactInquiriesController(
            DAL dal,
            IEmailService emailService,
            IConfiguration configuration,
            ILogger<ContactInquiriesController> logger)
        {
            _dal = dal;
            _emailService = emailService;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateContactInquiryRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.FirstName))
                    return BadRequest(new { message = "First name is required." });
                if (string.IsNullOrWhiteSpace(request.LastName))
                    return BadRequest(new { message = "Last name is required." });
                if (string.IsNullOrWhiteSpace(request.Phone))
                    return BadRequest(new { message = "Phone number is required." });
                if (string.IsNullOrWhiteSpace(request.Email))
                    return BadRequest(new { message = "Email is required." });
                if (string.IsNullOrWhiteSpace(request.City))
                    return BadRequest(new { message = "City is required." });
                if (string.IsNullOrWhiteSpace(request.Message))
                    return BadRequest(new { message = "Message is required." });

                const string sql = @"
                INSERT INTO ContactInquiries
                (
                    FirstName,
                    LastName,
                    Phone,
                    Email,
                    City,
                    Message,
                    CreatedAt
                )
                VALUES
                (
                    @FirstName,
                    @LastName,
                    @Phone,
                    @Email,
                    @City,
                    @Message,
                    UTC_TIMESTAMP()
                );
                SELECT LAST_INSERT_ID();";

                var id = await _dal.ExecuteScalarAsync<int>(sql, new
                {
                    FirstName = request.FirstName.Trim(),
                    LastName = request.LastName.Trim(),
                    Phone = request.Phone.Trim(),
                    Email = request.Email.Trim(),
                    City = request.City.Trim(),
                    Message = request.Message.Trim()
                });

                var adminEmail = _configuration["Smtp:AdminEmail"];
                try
                {
                    await _emailService.SendContactInquiryNotificationToAdminAsync(
                        adminEmail,
                        request.FirstName.Trim(),
                        request.LastName.Trim(),
                        request.Phone.Trim(),
                        request.Email.Trim(),
                        request.City.Trim(),
                        request.Message.Trim());
                }
                catch (Exception emailEx)
                {
                    _logger.LogError(emailEx, "Contact inquiry {ContactInquiryId} saved but admin email failed.", id);
                }

                return Ok(new { id, message = "Contact inquiry saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to save contact inquiry.",
                    error = ex.Message
                });
            }
        }
    }

    public class CreateContactInquiryRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
