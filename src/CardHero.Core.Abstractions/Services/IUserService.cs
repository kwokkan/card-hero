using System.Threading.Tasks;
using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    public interface IUserService
    {
        Task<User> GetUserByIdentifierAsync(string identifier, string idp);

        Task<User> CreateUserAsync(string identifier, string idp, string name);
    }
}
