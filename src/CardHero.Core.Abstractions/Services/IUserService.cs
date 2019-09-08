using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    public interface IUserService
    {
        Task<UserModel> GetUserByIdentifierAsync(string identifier, string idp);

        Task<UserModel> CreateUserAsync(string identifier, string idp, string name);
    }
}
