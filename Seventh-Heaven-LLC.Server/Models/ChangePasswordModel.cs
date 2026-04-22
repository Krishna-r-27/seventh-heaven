using System.ComponentModel.DataAnnotations;

namespace Seventh_Heaven_LLC.Server.Models
{
    public class ChangePasswordModel
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = string.Empty;
    }
}
