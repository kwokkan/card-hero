using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class UserRepository : IUserRepository
    {
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<User, UserData> _userMapper;

        public UserRepository(
            CardHeroDataDbContext context,
            IMapper<User, UserData> userMapper
        )
        {
            _context = context;

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

            await _context.User.AddAsync(efUser, cancellationToken: cancellationToken);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return _userMapper.Map(efUser);
        }

        Task<UserData> IUserRepository.GetUserByIdAsync(int id, CancellationToken cancellationToken)
        {
            var user = _context
                .User
                .Where(x => x.UserPk == id)
                .Select(_userMapper.Map)
                .FirstOrDefault();

            return Task.FromResult(user);
        }

        Task<UserData> IUserRepository.GetUserByIdentifierAsync(string identifier, string idp, CancellationToken cancellationToken)
        {
            var user = _context
                .User
                .Where(x => x.Identifier == identifier && x.IdPsource == idp)
                .Select(_userMapper.Map)
                .FirstOrDefault()
            ;

            return Task.FromResult(user);
        }

        async Task IUserRepository.UpdateUserAsync(int id, UserUpdateData update, CancellationToken cancellationToken)
        {
            var existingUser = await _context.User.Where(x => x.UserPk == id).SingleOrDefaultAsync(cancellationToken: cancellationToken);

            if (existingUser == null)
            {
                throw new CardHeroDataException($"Player { id } does not exist.");
            }

            if (update.Coins.IsSet)
            {
                existingUser.Coins = update.Coins.Value;
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);
        }
    }
}
