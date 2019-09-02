using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers
{
    public class AccountController : Controller
    {
        [Authorize]
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return LocalRedirect("~/");
            }

            return Unauthorized();
        }

        public IActionResult Logout()
        {
            return new SignOutResult(new[] { "Cookies", "oidc" });
        }
    }
}