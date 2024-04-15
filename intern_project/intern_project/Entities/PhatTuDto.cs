using System.ComponentModel.DataAnnotations;

namespace intern_project.Entities
{
    public class PhatTuDto
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        
        
        


    }
}
