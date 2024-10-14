using demoproject.API.Data;
using demoproject.API.models.Domain;
using Microsoft.EntityFrameworkCore;

namespace demoproject.API.Repositories
{
    public class SQLMovieRepository : IMovieRepository
    {
        private readonly DemoDbContext dbContext;

        public SQLMovieRepository(DemoDbContext dbContext)
        {
            this.dbContext= dbContext;
        }
        public async Task<Movie?> CreateAsync(Movie movie)
        {
            await dbContext.Movies.AddAsync(movie) ;
            await dbContext.SaveChangesAsync() ;
            return movie ;
        }

        public async Task<Movie?> DeleteAsync(Guid id)
        {
            var presntmovie = await dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
            if (presntmovie == null)
            {
                return null;
            }
            dbContext.Remove(presntmovie);
            await dbContext.SaveChangesAsync() ;
            return presntmovie ;
        }

        public async Task<List<Movie>> GetAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true)
        {
            var movies = dbContext.Movies.AsQueryable();
            if (string.IsNullOrWhiteSpace(filterOn)==false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    movies= movies.Where(x => x.Name.Contains(filterQuery));
                }
                if (filterOn.Equals("Year", StringComparison.OrdinalIgnoreCase))
                {
                    if (int.TryParse(filterQuery, out int Year))
                    {
                        movies = movies.Where(x => x.Year == Year);
                    }
                }
                if (filterOn.Equals("Genre", StringComparison.OrdinalIgnoreCase))
                {
                    movies = movies.Where(x => x.Genre.Contains(filterQuery));
                }
            }
           
            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    movies = isAscending ? movies.OrderBy(x => x.Name) : movies.OrderByDescending(x => x.Name);
                }
                else if (sortBy.Equals("Year", StringComparison.OrdinalIgnoreCase))
                {
                    movies = isAscending ? movies.OrderBy(x => x.Year) : movies.OrderByDescending(x => x.Year);
                }
            }
            return await movies.ToListAsync() ;
        }

        public async Task<Movie?> GetByIdAsync(Guid id)
        {
            return await dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);   
        }

        public async Task<Movie?> UpdateAsync(Guid id, Movie movie)
        {
            var presentMovie= await dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
            if (presentMovie == null)
            {
                return null ;
            }
            presentMovie.Name = movie.Name ;
            presentMovie.Genre = movie.Genre ;
            presentMovie.Year = movie.Year ;
            await dbContext.SaveChangesAsync() ;
            return presentMovie ;
        }

    }
}
