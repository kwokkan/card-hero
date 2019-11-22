using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class StoreController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Store",
                AppScript = "main",
            };

            return View(model);
        }
    }
}
