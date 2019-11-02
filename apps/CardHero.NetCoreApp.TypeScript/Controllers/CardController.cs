using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public class CardController : Controller
    {
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Cards",
                AppScript = "card",
            };

            return View(model);
        }
    }
}
