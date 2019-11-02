using System.Linq;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        private static readonly string[] AllowedIdPs = new string[]
        {
            LocalAuthenticationOptions.DefaultAuthenticationScheme,
            GitHubAuthenticationOptions.DefaultAuthenticationScheme,
        };

        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Home",
                AppScript = "home",
            };

            return View(model);
        }

        [Route(nameof(SignIn))]
        public ActionResult<SignInViewModel> SignIn()
        {
            var absoluteBaseUri = string.Format(
                "{0}://{1}{2}",
                Request.Scheme,
                Request.Host,
                Request.PathBase.HasValue ? "/" + Request.PathBase : string.Empty
            );

            var returnUrl = "/";

            var referer = Request.Headers["Referer"].ToString();

            if (!string.IsNullOrWhiteSpace(referer) && referer.StartsWith(absoluteBaseUri + "/"))
            {
                returnUrl = referer;
            }

            var model = new SignInViewModel
            {
                AllowedIdPs = AllowedIdPs,
                RedirectUri = returnUrl,
            };

            return View(model);
        }

        [HttpPost(nameof(SignIn))]
        [ValidateAntiForgeryToken]
        public ActionResult SignIn(string idp, string redirectUri)
        {
            if (!AllowedIdPs.Contains(idp))
            {
                return RedirectToAction(nameof(Index));
            }

            var absoluteBaseUri = string.Format(
                "{0}://{1}{2}",
                Request.Scheme,
                Request.Host,
                Request.PathBase.HasValue ? "/" + Request.PathBase : string.Empty
            );

            var returnUrl = "/";

            if (!string.IsNullOrWhiteSpace(redirectUri) && redirectUri.StartsWith(absoluteBaseUri + "/"))
            {
                returnUrl = redirectUri;
            }

            return Challenge(new AuthenticationProperties { RedirectUri = returnUrl }, idp);
        }

        [Route("SignOut")]
        public async Task<ActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync();

            // return SignOut() doesn't redirect correctly, it only shows a blank page even though it deletes the cookies
            return RedirectToAction(nameof(Index));
        }
    }
}
