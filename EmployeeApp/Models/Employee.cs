using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeApp.Models
{
    public class Employee
    {
        [Key]
        public int employeeId { get; set; }
        public string employeeName { get; set; }

        [ForeignKey("departmentId")]
        public int departmentId { get; set; }
        public DateTime dateOfJoining { get; set; }

        [ForeignKey("imageId")]
        public int imageId { get; set; }

        public virtual Department department { get; set; }

        public virtual ImageModel image { get; set; }
    }
}
