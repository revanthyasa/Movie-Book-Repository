using demoproject.API.Data;
using demoproject.API.models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace demoproject.API.Repositories
{
    public class SQLBookRepository : IBookRepository
    {
        private readonly DemoDbContext dbContext;

        public SQLBookRepository(DemoDbContext dbContext)
        {
            this.dbContext= dbContext;
        }
        public async Task<Book?> CreateAsync(Book book)
        {
            await dbContext.Books.AddAsync(book);
            await dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<Book?> DeleteAsync(Guid id)
        {
            var presntbook = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (presntbook == null)
            {
                return null;
            }
            dbContext.Remove(presntbook);
            await dbContext.SaveChangesAsync();
            return presntbook;
        }

        public async Task<List<Book>> GetAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true)
        {
            var books = dbContext.Books.AsQueryable();
            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    books = books.Where(x => x.Title.Contains(filterQuery));
                }
                if (filterOn.Equals("Year", StringComparison.OrdinalIgnoreCase))
                {
                    if (int.TryParse(filterQuery, out int Year))
                    {
                        books = books.Where(x => x.Year == Year);
                    }
                }
                if (filterOn.Equals("Author", StringComparison.OrdinalIgnoreCase))
                {
                    books = books.Where(x => x.Author.Contains(filterQuery));
                }
            }


            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    books = isAscending ? books.OrderBy(x => x.Title) : books.OrderByDescending(x => x.Title);
                }
                else if (sortBy.Equals("Year", StringComparison.OrdinalIgnoreCase))
                {
                    books = isAscending ? books.OrderBy(x => x.Year) : books.OrderByDescending(x => x.Year);
                }
            }
            return await books.ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(Guid id)
        {
            return await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Book?> UpdateAsync(Guid id, Book book)
        {
            var presentBook = await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (presentBook == null)
            {
                return null;
            }
            presentBook.Title = book.Title;
            presentBook.Author = book.Author;
            presentBook.Year = book.Year;
            await dbContext.SaveChangesAsync();
            return presentBook;
        }
    }
}
