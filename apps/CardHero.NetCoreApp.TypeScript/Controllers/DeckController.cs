using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Authorize]
    public class DeckController : Controller
    {
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Decks",
                AppScript = "deck",
            };

            return View(model);
        }
    }
}
