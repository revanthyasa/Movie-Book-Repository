using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace demoproject.API.Data
{
    public class DemoAuthDbContext : IdentityDbContext
    {
        public DemoAuthDbContext(DbContextOptions<DemoAuthDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var readerRoleId = "f6f7f622-6aef-4d27-bc1d-3231d30e57d7";
            var writerRoleId = "8f6e83d8-3b93-4a66-bb57-c578a7c73888";
            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id=readerRoleId,
                    ConcurrencyStamp= readerRoleId,
                    Name= "Reader",
                    NormalizedName="Reader".ToUpper()
                },
                new IdentityRole
                {
                    Id=writerRoleId,
                    ConcurrencyStamp= writerRoleId,
                    Name= "Writer",
                    NormalizedName="Writer".ToUpper()
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
