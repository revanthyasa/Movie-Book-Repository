using demoproject.API.models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace demoproject.API.Repositories
{
    public interface IMovieRepository
    {
        Task<Movie?> CreateAsync(Movie movie);
        Task<Movie?> UpdateAsync(Guid id, Movie movie);
        Task<Movie?> DeleteAsync(Guid id);
        Task<List<Movie>> GetAsync(string? filterOn=null, string? filterQuery=null, string? sortBy = null, bool isAscending = true);
        Task<Movie?> GetByIdAsync(Guid id);

    }
}
