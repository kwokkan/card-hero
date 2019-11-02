using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Authorize]
    public class CollectionController : Controller
    {
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Collection",
                AppScript = "collection",
            };

            return View(model);
        }
    }
}
