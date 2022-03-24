using Microsoft.EntityFrameworkCore;

namespace WebApi
{
    public class Context : DbContext
    {
        protected readonly IConfiguration Configuration;

        public Context()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer("Data Source=AURELIA\\SQLEXPRESS; User Id=hellothere; Password=hithere");
        }

        public DbSet<WeatherForecast> Forecasts { get; set; }
        public DbSet<City> Cities { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
