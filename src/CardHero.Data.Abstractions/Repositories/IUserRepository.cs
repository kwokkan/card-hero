using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IUserRepository
    {
        Task<UserData> CreateUserAsync(string identifier, string idp, string name, long coins, CancellationToken cancellationToken = default);

        Task<UserData> GetUserByIdAsync(int id, CancellationToken cancellationToken = default);

        Task<UserData> GetUserByIdentifierAsync(string identifier, string idp, CancellationToken cancellationToken = default);

        Task UpdateUserAsync(int id, UserUpdateData update, CancellationToken cancellationToken = default);
    }
}
