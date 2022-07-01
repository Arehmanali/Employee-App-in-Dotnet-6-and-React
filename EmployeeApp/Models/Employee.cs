using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeApp.Models
{
    public class Employee
    {
        public int employeeId { get; set; }
        public string employeeName { get; set; }
        public DateTime dateOfJoining { get; set; }
        public int departmentId { get; set; }
        public ImageModel Image { get; set; }

        //[ForeignKey("departmentId")]
        //public Department Departments { get; set; }
    }
}
