using System.Linq;
using System.Threading.Tasks;
using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    public class GameController : BaseController
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        private void PopulateViewModel(CreateGameViewModel model)
        {
        }

        public IActionResult Index(SearchGameViewModel model)
        {
            var filter = new GameSearchFilter
            {
            };
            ApplySortable(filter);

            return View(model);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new CreateGameViewModel
            {
            };
            PopulateViewModel(model);

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsync(CreateGameViewModel model)
        {
            if (!ModelState.IsValid || model.PlayerIds == null)
            {
                ModelState.AddModelError(string.Empty, "You must select some players.");
                PopulateViewModel(model);
                return View(model);
            }

            var users = model.PlayerIds.Select(x => new User
            {
                Id = x,
            }).ToArray();
            var game = new Game
            {
                Users = users,
            };
            var newGame = await _gameService.CreateGameAsync(game);

            return RedirectToAction("Details", new { id = newGame.Id });
        }

        public async Task<IActionResult> DetailsAsync(int id)
        {
            var filter = new GameSearchFilter
            {
                GameId = id,
            };
            var games = await _gameService.GetGamesAsync(filter);
            var game = games.Results.FirstOrDefault();

            if (game == null)
            {
                return NotFound();
            }

            var model = new GameViewModel
            {
                Id = game.Id,
                StartTime = game.StartTime,
                EndTime = game.EndTime,
                Rows = game.Rows,
                Columns = game.Columns,
            };

            return View(model);
        }
    }
}
