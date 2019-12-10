using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IUserRepository
    {
        Task<UserData> CreateUserAsync(string identifier, string idp, string name, long coins, CancellationToken cancellationToken = default);

        Task<UserData> GetUserByIdentifier(string identifier, string idp, CancellationToken cancellationToken = default);
    }
}
