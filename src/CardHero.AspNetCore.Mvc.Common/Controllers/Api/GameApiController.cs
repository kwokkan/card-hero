using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers.Api
{
    [Route("api/games")]
    public class GameApiController : BaseController
    {
        private readonly IGameService _gameService;

        public GameApiController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        [Route("")]
        public virtual async Task<SearchGameViewModel> IndexAsync(SearchGameViewModel model, CancellationToken cancellationToken)
        {
            var filter = new GameSearchFilter
            {
                Page = model.Page,
                PageSize = model.PageSize,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                ActiveOnly = model.ActiveOnly,
            };
            ApplySortable(filter);
            var games = await _gameService.GetGamesAsync(filter, cancellationToken: cancellationToken);

            model.Games = games.Results.Select(x => new GameViewModel
            {
                Id = x.Id,
                StartTime = x.StartTime,
                EndTime = x.EndTime,
                IsActive = !x.EndTime.HasValue,
            });

            return model;
        }
    }
}
