using AutoMapper;
using demoproject.API.Data;
using demoproject.API.models.Domain;
using demoproject.API.models.DTO;
using demoproject.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using demoproject.API.CustomActionFilters;
using Microsoft.AspNetCore.Authorization;
namespace demoproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository movieRepository;
        private readonly DemoDbContext dbContext;
        private readonly IMapper mapper;

        public MoviesController(IMovieRepository movieRepository, IMapper mapper)
        {
            this.movieRepository = movieRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddMovieReqDto addMovieReqDto)
        {
            var movieDomain = mapper.Map<Movie>(addMovieReqDto);
            await movieRepository.CreateAsync(movieDomain);
            var movieDto = mapper.Map<MovieDto>(movieDomain);
            return Ok(movieDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateMovieDto updateMovieDto)

        {
            var movieDomain=mapper.Map<Movie>(updateMovieDto);
            movieDomain=await movieRepository.UpdateAsync(id,movieDomain);  
            if (movieDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<MovieDto>(movieDomain));
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var movieDomain=await movieRepository.DeleteAsync(id);
            if (movieDomain == null)
            {
                return NotFound();
            }
            var moviedto=mapper.Map<MovieDto>(movieDomain);
            return Ok(moviedto);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [Authorize(Roles = "Reader,Writer")]
        public async Task<IActionResult?> GetById([FromRoute] Guid id)
        {
            var movieDomain= await movieRepository.GetByIdAsync(id);
            if(movieDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<MovieDto>(movieDomain));
        }

        [HttpGet]
        [Authorize(Roles = "Reader,Writer")]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,[FromQuery] string? sortBy,[FromQuery] bool? isAscending)
        {
            var movieDomain = await movieRepository.GetAsync(filterOn,filterQuery,sortBy,isAscending?? true);
            return Ok(mapper.Map<List<MovieDto>>(movieDomain));
        }
    }
}