using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    [Authorize]
    public class DeckController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}