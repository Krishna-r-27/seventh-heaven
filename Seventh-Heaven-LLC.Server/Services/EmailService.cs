using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using System;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Seventh_Heaven_LLC.Server.Services
{
    /// <summary>
    /// Simple SMTP-backed email sender. Reads SMTP settings from configuration:
    /// - Smtp:Host
    /// - Smtp:Port
    /// - Smtp:User
    /// - Smtp:Pass
    /// - Smtp:EnableSsl (bool)
    /// - Smtp:From
    /// 
    /// For production consider using a robust library (MailKit) and better error handling/retries.
    /// </summary>
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;
        private readonly IConfiguration _config;

        public EmailService(ILogger<EmailService> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }        

        public async Task SendPasswordResetLinkAsync(string toEmail, string resetLink)
        {
            var subject = "Reset your Vedic Stones password";
            var safeLink = System.Net.WebUtility.HtmlEncode(resetLink);
            var body = $@"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#faf8f4;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#111;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>VEDIC STONES</div>
        <div style='opacity:.9;margin-top:6px;'>Password reset</div>
      </div>
      <div style='background:#fff;border:1px solid #eee;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>We received a request to reset your password.</p>
        <p style='margin:0 0 16px;color:#555;line-height:1.6;'>Click the button below to set a new password. This link expires in 30 minutes.</p>
        <a href='{safeLink}'
           style='display:inline-block;background:#111;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:700;'>
          Reset Password
        </a>
        <p style='margin:16px 0 0;color:#777;font-size:12px;line-height:1.6;'>
          If you did not request this, you can ignore this email.
        </p>
      </div>
    </div>
  </body>
</html>";
            await SendAsync(toEmail, toEmail, subject, body);
        }

        public async Task SendAdminOtpAsync(string toEmail, string otp)
        {
            var subject = "PowerAdmin OTP verification code";
            var safeOtp = System.Net.WebUtility.HtmlEncode(otp);
            var body = $@"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#0b1f4a;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>POWERADMIN</div>
        <div style='opacity:.9;margin-top:6px;'>Forgot password verification</div>
      </div>
      <div style='background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>Use this OTP to verify your identity:</p>
        <div style='font-size:28px;letter-spacing:.4em;font-weight:900;color:#0b1f4a;margin:12px 0;'>{safeOtp}</div>
        <p style='margin:0;color:#777;font-size:12px;line-height:1.6;'>This OTP expires in 10 minutes. If you did not request this, ignore this email.</p>
      </div>
    </div>
  </body>
</html>";
            await SendAsync(toEmail, toEmail, subject, body);
        }

        public async Task SendPasswordResetConfirmationAsync(string toEmail)
        {
            var subject = "Your Vedic Stones password was changed";
            var body = @"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#faf8f4;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#111;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>VEDIC STONES</div>
        <div style='opacity:.9;margin-top:6px;'>Password updated</div>
      </div>
      <div style='background:#fff;border:1px solid #eee;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>Your password has been changed successfully.</p>
        <p style='margin:0;color:#555;line-height:1.6;'>
          If you did not perform this change, please contact support immediately.
        </p>
      </div>
    </div>
  </body>
</html>";
            await SendAsync(toEmail, toEmail, subject, body);
        }

        public async Task SendEmailVerificationAsync(string toEmail, string toName, string verifyLink, string otp)
        {
            var subject = "Verify your email — Vedic Stones";
            var safeLink = System.Net.WebUtility.HtmlEncode(verifyLink);
            var safeOtp = System.Net.WebUtility.HtmlEncode(otp);
            var safeName = System.Net.WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(toName) ? "Customer" : toName);

            var body = $@"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#faf8f4;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#111;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>VEDIC STONES</div>
        <div style='opacity:.9;margin-top:6px;'>Email verification</div>
      </div>
      <div style='background:#fff;border:1px solid #eee;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>Hi {safeName},</p>
        <p style='margin:0 0 16px;color:#555;line-height:1.6;'>
          Please verify your email to complete registration. This verification expires in 15 minutes.
        </p>
        <a href='{safeLink}'
           style='display:inline-block;background:#111;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:700;'>
          Verify Email
        </a>
        <div style='margin-top:16px;padding-top:14px;border-top:1px solid #f2f2f2;'>
          <div style='color:#888;font-size:12px;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;'>Or enter this OTP</div>
          <div style='font-size:28px;letter-spacing:.4em;font-weight:900;color:#111;margin:6px 0;'>{safeOtp}</div>
          <p style='margin:0;color:#777;font-size:12px;line-height:1.6;'>
            If you did not request this, you can ignore this email.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>";

            await SendAsync(toEmail, toName, subject, body);
        }

        public async Task SendContactInquiryNotificationToAdminAsync(
            string adminEmail,
            string firstName,
            string lastName,
            string phone,
            string email,
            string city,
            string message)
        {
            var subject = "New contact inquiry received";
            var safeFirstName = System.Net.WebUtility.HtmlEncode(firstName);
            var safeLastName = System.Net.WebUtility.HtmlEncode(lastName);
            var safePhone = System.Net.WebUtility.HtmlEncode(phone);
            var safeEmail = System.Net.WebUtility.HtmlEncode(email);
            var safeCity = System.Net.WebUtility.HtmlEncode(city);
            var safeMessage = System.Net.WebUtility.HtmlEncode(message).Replace("\n", "<br/>");

            var body = $@"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#0b1f4a;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>SEVENTH HEAVEN</div>
        <div style='opacity:.9;margin-top:6px;'>New contact form submission</div>
      </div>
      <div style='background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>A new inquiry was submitted from the Contact form.</p>
        <table style='width:100%;border-collapse:collapse;margin-top:12px;'>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>First Name:</td><td style='padding:6px 0;color:#111;'>{safeFirstName}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Last Name:</td><td style='padding:6px 0;color:#111;'>{safeLastName}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Phone:</td><td style='padding:6px 0;color:#111;'>{safePhone}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Email:</td><td style='padding:6px 0;color:#111;'>{safeEmail}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>City:</td><td style='padding:6px 0;color:#111;'>{safeCity}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;vertical-align:top;'>Message:</td><td style='padding:6px 0;color:#111;'>{safeMessage}</td></tr>
        </table>
      </div>
    </div>
  </body>
</html>";

            await SendAsync(adminEmail, adminEmail, subject, body);
        }

        public async Task SendPropertyInquiryNotificationToAdminAsync(
            string adminEmail,
            string firstName,
            string lastName,
            string phone,
            string email,
            string propertyType,
            int noOfPersons,
            DateTime visitDate)
        {
            var subject = "New property enquiry received";
            var safeFirstName = System.Net.WebUtility.HtmlEncode(firstName);
            var safeLastName = System.Net.WebUtility.HtmlEncode(lastName);
            var safePhone = System.Net.WebUtility.HtmlEncode(phone);
            var safeEmail = System.Net.WebUtility.HtmlEncode(email);
            var safePropertyType = System.Net.WebUtility.HtmlEncode(propertyType);
            var safeNoOfPersons = System.Net.WebUtility.HtmlEncode(noOfPersons.ToString());
            var safeVisitDate = System.Net.WebUtility.HtmlEncode(visitDate.ToString("yyyy-MM-dd"));

            var body = $@"<!doctype html>
<html lang='en'>
  <body style='margin:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:640px;margin:0 auto;padding:28px;'>
      <div style='background:#0b1f4a;color:#fff;border-radius:10px;padding:18px 20px;'>
        <div style='letter-spacing:.12em;font-weight:800;'>SEVENTH HEAVEN</div>
        <div style='opacity:.9;margin-top:6px;'>New property enquiry submission</div>
      </div>
      <div style='background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <p style='margin:0 0 10px;color:#222;'>A new enquiry was submitted from a Property Detail page.</p>
        <table style='width:100%;border-collapse:collapse;margin-top:12px;'>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>First Name:</td><td style='padding:6px 0;color:#111;'>{safeFirstName}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Last Name:</td><td style='padding:6px 0;color:#111;'>{safeLastName}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Phone:</td><td style='padding:6px 0;color:#111;'>{safePhone}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Email:</td><td style='padding:6px 0;color:#111;'>{safeEmail}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Property Type:</td><td style='padding:6px 0;color:#111;'>{safePropertyType}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>No. of Persons:</td><td style='padding:6px 0;color:#111;'>{safeNoOfPersons}</td></tr>
          <tr><td style='padding:6px 0;color:#555;font-weight:700;'>Visit Date:</td><td style='padding:6px 0;color:#111;'>{safeVisitDate}</td></tr>
        </table>
      </div>
    </div>
  </body>
</html>";

            await SendAsync(adminEmail, adminEmail, subject, body);
        }

        // ── Core Send ─────────────────────────────────────────────────────
        private async Task SendAsync(string toAddress, string toName, string subject, string htmlBody)
        {
            var message = new MimeMessage();

            var fromAddress = _config["Smtp:FromAddress"] ?? "noreply@vedicstones.com";
            var fromName = _config["Smtp:FromName"] ?? "Vedic Stones";
            message.From.Add(new MailboxAddress(fromName, fromAddress));
            message.To.Add(new MailboxAddress(toName, toAddress));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = htmlBody };
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();

            var host = _config["Smtp:Host"] ?? "smtp.gmail.com";
            var port = int.Parse(_config["Smtp:Port"] ?? "587");
            var enableSsl = bool.Parse(_config["Smtp:EnableSsl"] ?? "true");
            var username = _config["Smtp:Username"] ?? string.Empty;
            var password = _config["Smtp:Password"] ?? string.Empty;

            var socketOptions = enableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None;

            await client.ConnectAsync(host, port, socketOptions);
            await client.AuthenticateAsync(username, password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("Email sent to {ToAddress} | Subject: {Subject}", toAddress, subject);
        }
    }
}