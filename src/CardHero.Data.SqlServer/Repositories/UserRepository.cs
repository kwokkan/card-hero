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
