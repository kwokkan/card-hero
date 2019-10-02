using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly NewUserOptions _newUserOptions;

        public UserService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory, NewUserOptions newUserOptions)
            : base(contextFactory)
        {
            _newUserOptions = newUserOptions;
        }

        public async Task<UserModel> CreateUserAsync(string identifier, string idp, string name, CancellationToken cancellationToken = default)
        {
            var user = await GetUserByIdentifierAsync(identifier, idp, cancellationToken: cancellationToken);

            if (user == null)
            {
                var efUser = new User
                {
                    Identifier = identifier,
                    IdPsource = idp,
                    FullName = name,

                    Coins = _newUserOptions.Coins,
                };

                var context = GetContext();

                var newUser = await context.User.AddAsync(efUser);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                user = newUser.Entity.ToCore();
            }

            return user;
        }

        public async Task<UserModel> GetUserByIdentifierAsync(string identifier, string idp, CancellationToken cancellationToken = default)
        {
            var context = GetContext();

            var user = await context
                .User
                .Select(EntityFrameworkExtensions.ToCoreExp)
                .SingleOrDefaultAsync(x => x.Identifier == identifier && x.IdPsource == idp, cancellationToken: cancellationToken);

            return user;
        }
    }
}
