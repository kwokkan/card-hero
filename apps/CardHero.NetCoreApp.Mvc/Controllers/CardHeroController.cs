using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers
{
    public abstract class CardHeroController : Controller
    {
        private readonly IUserService _userService;

        public CardHeroController(IUserService userService)
        {
            _userService = userService;
        }

        protected async Task<UserModel> GetUserAsync(CancellationToken cancellationToken)
        {
            if (User.Identity.IsAuthenticated)
            {
                var sub = User.FindFirst("sub")?.Value;
                var idp = User.FindFirst("idp")?.Value;

                var user = await _userService.GetUserByIdentifierAsync(sub, idp, cancellationToken: cancellationToken);

                if (user == null)
                {
                    var name = User.FindFirst("name")?.Value;

                    user = await _userService.CreateUserAsync(sub, idp, name, cancellationToken: cancellationToken);
                }

                return user;
            }

            return null;
        }
    }
}
