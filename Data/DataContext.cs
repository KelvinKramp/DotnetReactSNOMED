using Microsoft.EntityFrameworkCore;
using REACT.Controllers;

namespace REACT.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Consult> Consults { get; set; }
    }
}

