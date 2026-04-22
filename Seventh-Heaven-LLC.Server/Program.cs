using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Seventh_Heaven_LLC.Server.Data;
using Seventh_Heaven_LLC.Server.Repositories;
using Seventh_Heaven_LLC.Server.Services;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddScoped<Seventh_Heaven_LLC.Server.Repositories.IPropertyRepository, Seventh_Heaven_LLC.Server.Repositories.PropertyRepository>();

builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<ImageStorageService>();
// 1) Configure CORS: allow the development client origin(s).
//    Replace "http://localhost:3000" with your client origin if different.

var corsOrigins = builder.Configuration
    .GetSection("CorsOrigins")
    .Get<string[]>()
    ?? new[]
    {   
        
        "https://localhost:7176",
        "http://localhost:7176"
    };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


// Add services to the container.
builder.Services.AddControllers();

// Register DAL and JWT services
builder.Services.AddScoped<DAL>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<Seventh_Heaven_LLC.Server.Services.IEmailService, Seventh_Heaven_LLC.Server.Services.EmailService>();
// Configure JWT authentication
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtSecret = jwtSection["Secret"] ?? throw new InvalidOperationException("JWT secret not configured in appsettings");
var jwtIssuer = jwtSection["Issuer"];
var jwtAudience = jwtSection["Audience"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
})
    .AddJwtBearer("Bearer", options =>
    {
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateIssuer = !string.IsNullOrEmpty(jwtIssuer),
            ValidIssuer = jwtIssuer,
            ValidateAudience = !string.IsNullOrEmpty(jwtAudience),
            ValidAudience = jwtAudience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// 2) Add controllers (or other services your API uses)
app.MapControllers();

// 3) Use CORS before routing to ensure OPTIONS preflight is handled.
//app.UseCors("AllowLocalDev");
app.UseCors("AllowFrontend");

app.MapFallbackToFile("/index.html");

// Ensure Users table exists and seed an initial admin user (idempotent).
using (var scope = app.Services.CreateScope())
{
    var dal = scope.ServiceProvider.GetRequiredService<DAL>();

    var createSql = @"CREATE TABLE IF NOT EXISTS `Users` (
        `UserId` INT NOT NULL AUTO_INCREMENT,
        `Email` VARCHAR(255) NOT NULL,
        `PasswordHash` VARCHAR(255) NOT NULL,
        `Role` VARCHAR(50) NOT NULL,
        `CreatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(`UserId`),
        UNIQUE KEY `UX_Users_Email` (`Email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    // Create table if it doesn't exist
    dal.ExecuteAsync(createSql).GetAwaiter().GetResult();

    // Insert admin user if not exists
    var adminEmail = "admin@seventh.com";
    var adminPlain = "P@ssw0rd";
    var adminHash = BCrypt.Net.BCrypt.HashPassword(adminPlain);

    var insertSql = @"INSERT INTO Users (Email, PasswordHash, Role)
        SELECT @Email, @Hash, 'Admin' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email=@Email);";

    dal.ExecuteAsync(insertSql, new { Email = adminEmail, Hash = adminHash }).GetAwaiter().GetResult();
}

app.Run();
