using demoproject.API.models.Domain;
using Microsoft.EntityFrameworkCore;
namespace demoproject.API.Data
{
    public class DemoDbContext : DbContext
    {
        public DemoDbContext(DbContextOptions<DemoDbContext> dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<Movie> Movies {  get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<History> Histories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var movies = new List<Movie>()
            {
                new Movie()
                {
                    Id = Guid.Parse("f9a52b9e-685f-4521-9c5e-c2313b1992b8"),
                    Name = "Happy",
                    Genre = "Action · Comedy · Drama · Romance",
                    Year=2006
                },
                new Movie()
                {
                    Id = Guid.Parse("15540e09-92f9-4349-a73e-72e1def78e6d"),
                    Name = "Arya2",
                    Genre = "Action/Comedy",
                    Year=2024
                }
                
            };

            modelBuilder.Entity<Movie>().HasData(movies);
        }
    }
}
