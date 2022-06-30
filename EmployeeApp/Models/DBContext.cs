using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Models
{
    public class DBContext : DbContext
    {

        public DBContext(DbContextOptions<DBContext> options)
           : base(options)
        {
        }

        //protected void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Employee>()
        //                .HasRequired(a => a.department)
        //                .WithMany()
        //                .HasForeignKey(u => u.departmentId);

        //    modelBuilder.Entity<Employee>()
        //                .HasRequired(a => a.image)
        //                .WithMany()
        //                .HasForeignKey(u => u.imageId).WillCascadeOnDelete(false);
        //}

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<ImageModel> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<Department>().ToTable("Departments");
            modelBuilder.Entity<ImageModel>().ToTable("Images");
        }
    }
}
