using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IUserRepository _userRepository;

        private readonly IDataMapper<UserData, UserModel> _userDataMapper;

        private readonly NewUserOptions _newUserOptions;

        public UserService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IUserRepository userRepository,
            IDataMapper<UserData, UserModel> userDataMapper,
            NewUserOptions newUserOptions
        )
            : base(contextFactory)
        {
            _userRepository = userRepository;

            _userDataMapper = userDataMapper;

            _newUserOptions = newUserOptions;
        }

        private async Task<UserModel> GetUserByIdentifierInternalAsync(string identifier, string idp, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByIdentifierAsync(identifier, idp, cancellationToken: cancellationToken);

            return user == null ? null : _userDataMapper.Map(user);
        }

        async Task<UserModel> IUserService.CreateUserAsync(string identifier, string idp, string name, CancellationToken cancellationToken)
        {
            var user = await GetUserByIdentifierInternalAsync(identifier, idp, cancellationToken);

            if (user == null)
            {
                var userData = await _userRepository.CreateUserAsync(identifier, idp, name, _newUserOptions.Coins, cancellationToken: cancellationToken);

                user = _userDataMapper.Map(userData);
            }

            return user;
        }

        Task<UserModel> IUserService.GetUserByIdentifierAsync(string identifier, string idp, CancellationToken cancellationToken)
        {
            return GetUserByIdentifierInternalAsync(identifier, idp, cancellationToken);
        }
    }
}
