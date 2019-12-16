using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public abstract class CardHeroBaseController : Controller
    {
        protected ActionResult<ReactAppViewModel> ReactView(ReactAppViewModel model)
        {
            return View("ReactView", model);
        }
    }
}
