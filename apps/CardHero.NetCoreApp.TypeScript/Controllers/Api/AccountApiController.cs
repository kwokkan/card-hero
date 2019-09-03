using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/account")]
    [Authorize]
    public class AccountApiController : CardHeroControllerBase
    {
        public AccountApiController(IUserService userService)
            : base(userService)
        {
        }

        public async Task<ActionResult<User>> GetAsync()
        {
            var user = await GetUserAsync();

            if (user == null)
            {
                return Unauthorized();
            }

            var result = new User
            {
                Coins = user.Coins,
                FullName = user.FullName,
                Identifier = user.Identifier,
            };

            return Ok(result);
        }
    }
}