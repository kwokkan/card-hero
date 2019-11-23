using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize]
    public class DeckController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Decks",
                AppScript = "main",
            };

            return View(model);
        }

        [HttpGet("{id:int}")]
        public IActionResult View(int id)
        {
            var model = new ReactAppViewModel
            {
                Title = "Decks",
                AppScript = "main",
            };

            return View(nameof(Index), model);
        }
    }
}
