using Microsoft.AspNetCore.Identity;

namespace demoproject.API.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user,List<string> roles);
    }
}
