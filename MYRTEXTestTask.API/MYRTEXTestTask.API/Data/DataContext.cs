using Microsoft.EntityFrameworkCore;
using MYRTEXTestTask.API.Models;

namespace MYRTEXTestTask.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Employee> Employees => Set<Employee>();
    }
}
