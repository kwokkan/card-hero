using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public class StoreController : Controller
    {
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Store",
                AppScript = "store",
            };

            return View(model);
        }
    }
}
