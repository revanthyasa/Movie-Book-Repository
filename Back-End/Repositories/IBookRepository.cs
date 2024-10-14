using demoproject.API.models.Domain;

namespace demoproject.API.Repositories
{
    public interface IBookRepository 
    {
        Task<Book?> CreateAsync(Book book);
        Task<Book?> UpdateAsync(Guid id, Book book);
        Task<Book?> DeleteAsync(Guid id);
        Task<List<Book>> GetAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true);
        Task<Book?> GetByIdAsync(Guid id);
    }
}
