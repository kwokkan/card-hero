using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        public async Task<IActionResult> LogoutAsync()
        {
            await Request.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            foreach (var cookie in HttpContext.Request.Cookies)
            {
                HttpContext.Response.Cookies.Delete(cookie.Key);
            }

            return new SignOutResult("OpenIdConnect", new AuthenticationProperties
            {
                RedirectUri = Url.Action("Index", "Home"),
            });
        }
    }
}
