﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApp.Models
{
    public class Department
    {
        public int departmentId { get; set; }
        public string departmentName { get; set; }


        //[NotMapped]
        //public int? employeeId { get; set; }
    }
}
