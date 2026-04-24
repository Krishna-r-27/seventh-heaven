using Microsoft.AspNetCore.Mvc;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.Services;
using System.Text.RegularExpressions;

namespace Seventh_Heaven_LLC.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyInquiriesController : ControllerBase
    {
        private readonly DAL _dal;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PropertyInquiriesController> _logger;

        public PropertyInquiriesController(
            DAL dal,
            IEmailService emailService,
            IConfiguration configuration,
            ILogger<PropertyInquiriesController> logger)
        {
            _dal = dal;
            _emailService = emailService;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePropertyInquiryRequest request)
        {
            try
            {
                const string ensureTableSql = @"CREATE TABLE IF NOT EXISTS `PropertyInquiries` (
                    `Id` INT NOT NULL AUTO_INCREMENT,
                    `FirstName` VARCHAR(100) NOT NULL,
                    `LastName` VARCHAR(100) NOT NULL,
                    `Phone` VARCHAR(20) NOT NULL,
                    `Email` VARCHAR(255) NOT NULL,
                    `PropertyType` VARCHAR(100) NOT NULL,
                    `NoOfPersons` INT NOT NULL,
                    `VisitDate` DATE NOT NULL,
                    `CreatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (`Id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
                await _dal.ExecuteAsync(ensureTableSql);

                var alphaSpace = new Regex(@"^[A-Za-z ]+$");
                var emailRegex = new Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$");

                if (string.IsNullOrWhiteSpace(request.FirstName))
                    return BadRequest(new { message = "First name is mandatory." });
                if (!alphaSpace.IsMatch(request.FirstName.Trim()))
                    return BadRequest(new { message = "First name allows only alphabets and spaces." });

                if (string.IsNullOrWhiteSpace(request.LastName))
                    return BadRequest(new { message = "Last name is mandatory." });
                if (!alphaSpace.IsMatch(request.LastName.Trim()))
                    return BadRequest(new { message = "Last name allows only alphabets and spaces." });

                if (string.IsNullOrWhiteSpace(request.Phone))
                    return BadRequest(new { message = "Phone number is mandatory." });
                var phone = request.Phone.Trim();
                if (!Regex.IsMatch(phone, @"^\d{10}$"))
                    return BadRequest(new { message = "Phone number must be exactly 10 digits." });

                if (string.IsNullOrWhiteSpace(request.Email))
                    return BadRequest(new { message = "Email is mandatory." });
                if (!emailRegex.IsMatch(request.Email.Trim()))
                    return BadRequest(new { message = "Please provide a valid email address." });

                if (string.IsNullOrWhiteSpace(request.PropertyType))
                    return BadRequest(new { message = "Property type is mandatory." });

                if (request.NoOfPersons <= 0)
                    return BadRequest(new { message = "No. of persons must be greater than zero." });

                if (request.VisitDate == default)
                    return BadRequest(new { message = "Visit date is mandatory." });

                const string sql = @"
                INSERT INTO PropertyInquiries
                (  
                    propertyID,
                    FirstName,
                    LastName,
                    Phone,
                    Email,
                    PropertyType,
                    NoOfPersons,
                    VisitDate,
                    CreatedAt
                )
                VALUES
                (
                    @propertyID,
                    @FirstName,
                    @LastName,
                    @Phone,
                    @Email,
                    @PropertyType,
                    @NoOfPersons,
                    @VisitDate,
                    UTC_TIMESTAMP()
                );
                SELECT LAST_INSERT_ID();";

                var id = await _dal.ExecuteScalarAsync<int>(sql, new
                {
                    propertyID = request.ID,
                    FirstName = request.FirstName.Trim(),
                    LastName = request.LastName.Trim(),
                    Phone = phone,
                    Email = request.Email.Trim(),
                    PropertyType = request.PropertyType.Trim(),
                    NoOfPersons = request.NoOfPersons,
                    VisitDate = request.VisitDate.Date
                });

                var adminEmail = _configuration["Smtp:AdminEmail"];
                try
                {
                    await _emailService.SendPropertyInquiryNotificationToAdminAsync(
                        adminEmail ?? string.Empty,
                        request.FirstName.Trim(),
                        request.LastName.Trim(),
                        phone,
                        request.Email.Trim(),
                        request.PropertyType.Trim(),
                        request.NoOfPersons,
                        request.VisitDate.Date);
                }
                catch (Exception emailEx)
                {
                    _logger.LogError(emailEx, "Property inquiry {PropertyInquiryId} saved but admin email failed.", id);
                }

                return Ok(new { id, message = "Property inquiry saved successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to save property inquiry.",
                    error = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                const string sql = @"
        SELECT 
            Id,
            FirstName,
            LastName,
            Phone,
            Email,
            PropertyType,
            VisitDate
        FROM PropertyInquiries
        ORDER BY Id DESC;";

                var data = (await _dal.QueryAsync<dynamic>(sql))
                    .Select(x => new
                    {
                        id = x.Id,
                        firstname = x.FirstName,
                        lastname = x.LastName,
                        phone = x.Phone,
                        email = x.Email,
                        propertyType = x.PropertyType,
                        visitDate = x.VisitDate
                    });

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to load inquiries.",
                    error = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                const string sql = @"
        SELECT 
            Id,
            FirstName,
            LastName,
            Phone,
            Email,
            PropertyType,
            NoOfPersons,
            VisitDate,
            CreatedAt,
            propertyID
        FROM PropertyInquiries
        WHERE Id = @Id;";

                var data = (await _dal.QueryAsync<dynamic>(sql, new { Id = id })).ToList();

                if (data == null)
                    return NotFound(new { message = "Inquiry not found." });
                var first = data.First();
                return Ok(new
                {
                    id = first.Id,
                    firstname = first.FirstName,
                    lastname = first.LastName,
                    phone = first.Phone,
                    email = first.Email,
                    propertyType = first.PropertyType,
                    noOfPersons = first.NoOfPersons,
                    visitDate = first.VisitDate,
                    createdAt = first.CreatedAt,
                    propertyId = first.propertyID
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to load inquiry details.",
                    error = ex.Message
                });
            }
        }
    }

    public class CreatePropertyInquiryRequest
    {
        public int ID { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PropertyType { get; set; } = string.Empty;
        public int NoOfPersons { get; set; }
        public DateTime VisitDate { get; set; }
    }
}
