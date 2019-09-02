using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers
{
    public class CardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}