using AutoMapper;
using demoproject.API.models.Domain;
using demoproject.API.models.DTO;

namespace demoproject.API.Mappings
{
    public class AutoMappings:Profile
    {
        public AutoMappings()
        {
            CreateMap<Movie, AddMovieReqDto>().ReverseMap();
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<Movie,UpdateMovieDto>().ReverseMap();
            CreateMap<Book, AddBookReqDto>().ReverseMap();
            CreateMap<Book, BookDto>().ReverseMap();
            CreateMap<Book, UpdateBookDto>().ReverseMap();
        }
    }
}
