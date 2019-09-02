using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route(nameof(SignIn))]
        public IActionResult SignIn()
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

            return Challenge(new AuthenticationProperties { RedirectUri = returnUrl }, GitHubAuthenticationOptions.DefaultAuthenticationScheme);
        }

        [Route("SignOut")]
        public async System.Threading.Tasks.Task<IActionResult> SignOutAsync()
        {
            await HttpContext.SignOutAsync();

            // return SignOut() doesn't redirect correctly, it only shows a blank page even though it deletes the cookies
            return RedirectToAction(nameof(Index));
        }
    }
}