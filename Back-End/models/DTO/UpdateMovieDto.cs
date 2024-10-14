using System.ComponentModel.DataAnnotations;

namespace demoproject.API.models.DTO
{
    public class UpdateMovieDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Name has to be min of 3 char")]
        public string Genre { get; set; }
        [Required]
        public int Year { get; set; }
    }
}
