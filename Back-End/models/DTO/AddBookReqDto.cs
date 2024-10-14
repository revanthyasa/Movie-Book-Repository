using System.ComponentModel.DataAnnotations;

namespace demoproject.API.models.DTO

{
    public class AddBookReqDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Name has to be min of 3 char")]
        public string Author { get; set; }
        [Required]
        public int Year { get; set; }
    }
}
