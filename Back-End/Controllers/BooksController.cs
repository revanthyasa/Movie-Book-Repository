using AutoMapper;
using demoproject.API.CustomActionFilters;
using demoproject.API.Data;
using demoproject.API.models.Domain;
using demoproject.API.models.DTO;
using demoproject.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace demoproject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository bookRepository;
        private readonly DemoDbContext dbContext;
        private readonly IMapper mapper;

        public BooksController(IBookRepository bookRepository, IMapper mapper)
        {
            this.bookRepository = bookRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddBookReqDto addBookReqDto)
        {
            var bookDomain = mapper.Map<Book>(addBookReqDto);
            await bookRepository.CreateAsync(bookDomain);
            var bookDto = mapper.Map<BookDto>(bookDomain);
            return Ok(bookDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateBookDto updateBookDto)

        {
            var bookDomain = mapper.Map<Book>(updateBookDto);
            bookDomain = await bookRepository.UpdateAsync(id, bookDomain);
            if (bookDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<BookDto>(bookDomain));
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var bookDomain = await bookRepository.DeleteAsync(id);
            if (bookDomain == null)
            {
                return NotFound();
            }
            var bookdto = mapper.Map<BookDto>(bookDomain);
            return Ok(bookdto);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [Authorize(Roles = "Reader,Writer")]
        public async Task<IActionResult?> GetById([FromRoute] Guid id)
        {
            var bookDomain = await bookRepository.GetByIdAsync(id);
            if (bookDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<BookDto>(bookDomain));
        }

        [HttpGet]
        [Authorize(Roles = "Reader,Writer")]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery, [FromQuery] string? sortBy, [FromQuery] bool? isAscending)
        {
            var bookDomain = await bookRepository.GetAsync(filterOn, filterQuery, sortBy, isAscending ?? true);
            return Ok(mapper.Map<List<BookDto>>(bookDomain));
        }
    }
}
