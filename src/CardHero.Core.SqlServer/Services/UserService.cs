using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Options;

namespace CardHero.Core.SqlServer.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly NewUserOptions _newUserOptions;

        public UserService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory, IOptions<CardHeroOptions> options, NewUserOptions newUserOptions)
            : base(contextFactory, options)
        {
            _newUserOptions = newUserOptions;
        }

        public async Task<Core.Models.User> CreateUserAsync(string identifier, string idp, string name)
        {
            var user = await GetUserByIdentifierAsync(identifier, idp);

            if (user == null)
            {
                var efUser = new EntityFramework.User
                {
                    Identifier = identifier,
                    IdPsource = idp,
                    FullName = name,

                    Coins = _newUserOptions.Coins
                };

                var context = GetContext();

                var newUser = await context.User.AddAsync(efUser);

                await context.SaveChangesAsync();

                user = newUser.Entity.ToCore();
            }

            return user;
        }

        public async Task<Core.Models.User> GetUserByIdentifierAsync(string identifier, string idp)
        {
            var context = GetContext();

            var user = await context
                .User
                .Select(x => x.ToCore())
                .SingleOrDefaultAsync(x => x.Identifier == identifier && x.IdPsource == idp);

            return user;
        }
    }
}
