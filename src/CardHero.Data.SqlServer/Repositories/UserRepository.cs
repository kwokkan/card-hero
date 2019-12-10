using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class UserRepository : IUserRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        private readonly IMapper<User, UserData> _userMapper;

        public UserRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<User, UserData> userMapper
        )
        {
            _factory = factory;

            _userMapper = userMapper;
        }

        async Task<UserData> IUserRepository.CreateUserAsync(string identifier, string idp, string name, long coins, CancellationToken cancellationToken)
        {
            var efUser = new User
            {
                Identifier = identifier,
                IdPsource = idp,
                FullName = name,

                Coins = coins,
            };

            using (var context = _factory.Create(trackChanges: true))
            {
                await context.User.AddAsync(efUser);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return _userMapper.Map(efUser);
            }
        }

        Task<UserData> IUserRepository.GetUserByIdentifier(string identifier, string idp, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var user = context
                    .User
                    .Where(x => x.Identifier == identifier && x.IdPsource == idp)
                    .Select(_userMapper.Map)
                    .FirstOrDefault()
                ;

                return Task.FromResult(user);
            }
        }
    }
}
