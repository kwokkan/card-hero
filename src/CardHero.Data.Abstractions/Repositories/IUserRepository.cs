using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IUserRepository
    {
        Task<UserData> GetUserByIdentifier(string identifier, string idp, CancellationToken cancellationToken = default);
    }
}
