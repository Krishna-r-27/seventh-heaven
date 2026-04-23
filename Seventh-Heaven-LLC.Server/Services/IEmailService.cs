using Seventh_Heaven_LLC.Server.DTOs;

namespace Seventh_Heaven_LLC.Server.Services
{
    public interface IEmailService
    {
        /// <summary>Send order confirmation to customer + new order alert to admin.</summary>
        //Task SendOrderConfirmationAsync(OrderResponse order, string customerEmail, string customerName);

        //Task SendErrorNotificationAsync(ErrorLogEntry entry, CancellationToken ct = default);

        Task SendPasswordResetLinkAsync(string toEmail, string resetLink);
        Task SendAdminOtpAsync(string toEmail, string otp);
        Task SendPasswordResetConfirmationAsync(string toEmail);
        Task SendEmailVerificationAsync(string toEmail, string toName, string verifyLink, string otp);
        Task SendContactInquiryNotificationToAdminAsync(string adminEmail, string firstName, string lastName, string phone, string email, string city, string message);
    }
}
