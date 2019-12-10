using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    internal class UserRepository : IUserRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        public UserRepository(ICardHeroDataDbContextFactory factory)
        {
            _factory = factory;
        }

        async Task<UserData> IUserRepository.GetUserByIdentifier(string identifier, string idp, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var user = await context
                    .User
                    .Where(x => x.Identifier == identifier && x.IdPsource == idp)
                    .Select(x => new UserData
                    {
                        Coins = x.Coins,
                        FullName = x.FullName,
                        Id = x.UserPk,
                    })
                    .FirstOrDefaultAsync()
                ;

                return user;
            }
        }
    }
}
