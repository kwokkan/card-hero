using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class CardController : CardHeroBaseController
    {
        [HttpGet]
        public ActionResult<ReactAppViewModel> Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Cards",
                AppScript = "main",
            };

            return ReactView(model);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ReactAppViewModel> View(int id)
        {
            var model = new ReactAppViewModel
            {
                Title = "Cards",
                AppScript = "main",
            };

            return ReactView(model);
        }
    }
}
