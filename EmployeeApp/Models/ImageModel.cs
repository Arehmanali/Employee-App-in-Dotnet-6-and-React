using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.Models
{
    public class ImageModel
    {
        [Key]
        public int imageId { get; set; }
        public string imageName { get; set; }
        //public byte[] imageData { get; set; }
    }
}
