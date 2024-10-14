using System.ComponentModel.DataAnnotations;

namespace demoproject.API.models.DTO
{
    public class LoginReqestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
