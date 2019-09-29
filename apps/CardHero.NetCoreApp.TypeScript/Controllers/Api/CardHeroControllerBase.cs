using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [ApiController]
    [ProducesErrorResponseType(typeof(ErrorViewModel))]
    public abstract class CardHeroControllerBase : ControllerBase
    {
        private readonly IUserService _userService;

        public CardHeroControllerBase(IUserService userService)
        {
            _userService = userService;
        }

        protected async Task<UserModel> GetUserAsync()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var sub = User.FindFirst("sub")?.Value;
            var idp = User.FindFirst("idp")?.Value;

            if (sub == null || idp == null)
            {
                return null;
            }

            var user = await _userService.GetUserByIdentifierAsync(sub, idp);

            if (user == null)
            {
                var name = User.FindFirst("name")?.Value;

                user = await _userService.CreateUserAsync(sub, idp, name);
            }

            return user;
        }
    }
}
