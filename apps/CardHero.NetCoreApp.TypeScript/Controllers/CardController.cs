using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class CardController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Cards",
                AppScript = "card",
            };

            return View(model);
        }

        [HttpGet("{id:int}")]
        public IActionResult View(int id)
        {
            var model = new ReactAppViewModel
            {
                Title = "Cards",
                AppScript = "card",
            };

            return View(nameof(Index), model);
        }
    }
}
