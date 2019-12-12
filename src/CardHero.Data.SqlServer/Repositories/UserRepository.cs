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

        Task<UserData> IUserRepository.GetUserByIdAsync(int id, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var user = context
                    .User
                    .Where(x => x.UserPk == id)
                    .Select(_userMapper.Map)
                    .FirstOrDefault();

                return Task.FromResult(user);
            }
        }

        Task<UserData> IUserRepository.GetUserByIdentifierAsync(string identifier, string idp, CancellationToken cancellationToken)
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

        async Task IUserRepository.UpdateUserAsync(int id, UserUpdateData update, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create(trackChanges: true))
            {
                var existingUser = await context.User.Where(x => x.UserPk == id).SingleOrDefaultAsync(cancellationToken: cancellationToken);

                if (existingUser == null)
                {
                    throw new CardHeroDataException($"Player { id } does not exist.");
                }

                if (update.Coins.IsSet)
                {
                    existingUser.Coins = update.Coins.Value;
                }

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }
    }
}
