using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
           : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<ImageModel> Images { get; set; }
    }
}
