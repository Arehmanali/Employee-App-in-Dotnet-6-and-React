using EmployeeApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EmployeesController(DBContext context, IConfiguration configuration, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _configuration = configuration;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }

            return await _context.Employees.Include(e => e.Image).ToListAsync(); ;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees.Include(e => e.Image).FirstOrDefaultAsync(i => i.employeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee emp)
        {
            if (id != emp.employeeId)
            {
                return BadRequest();
            }

            _context.Update(emp);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();

        }

        //public PostImage()
        //{
        //    string rootPath = @"ClientApp";
        //    string filename = Path.GetFileNameWithoutExtension(emp.photoFilename);
        //    string extension = Path.GetExtension(emp.photoFilename);
        //    emp.photoFilename = filename + DateTime.Now.ToString("yymmssfff") + extension;
        //    string path = Path.Combine(rootPath + "/image/", filename);

        //    using (var fileStream = new FileStream(path, FileMode.Create))
        //    {
        //        await emp.imageFile.CopyToAsync(fileStream);
        //    }
        //}

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromForm] Employee emp)
        {
            if (_context.Employees == null)
            {
                return Problem("Entity set 'DBContext.Employees'  is null.");
            }

            emp.Image.imageName = await SaveImage(emp.Image.imageFile);

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var emp = await _context.Employees.Include(e => e.Image).FirstOrDefaultAsync(i => i.employeeId == id);

            if (emp == null)
            {
                return NotFound();
            }

            ImageModel? img = await _context.Images.FindAsync(emp.Image.imageId);
            _context.Images.Remove(img);
            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employees?.Any(e => e.employeeId == id)).GetValueOrDefault();
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
