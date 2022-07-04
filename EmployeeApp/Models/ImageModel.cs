using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApp.Models
{
    public class ImageModel
    {
        [Key]
        public int imageId { get; set; }
        public string imageName { get; set; }

        [NotMapped]
        public IFormFile imageFile { get; set; }

    }
}
