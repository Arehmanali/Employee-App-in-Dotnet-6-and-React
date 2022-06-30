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
        public DateTime dateOfJoining { get; set; }
        public int? departmentId { get; set; }
        public int? imageId { get; set; }

        public ImageModel Image { get; set; }

        public Department Department { get; set; }
    }
}
