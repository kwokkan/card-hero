using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize]
    public class CollectionController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReactAppViewModel
            {
                Title = "Collection",
                AppScript = "main",
            };

            return View(model);
        }
    }
}
