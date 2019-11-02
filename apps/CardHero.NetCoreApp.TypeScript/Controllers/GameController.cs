using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Games",
                AppScript = "game",
            };

            return View(model);
        }
    }
}
