using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/games")]
    public class GameApiController : CardHeroControllerBase
    {
        private readonly IGameService _gameService;

        public GameApiController(IUserService userService, IGameService gameService)
            : base(userService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GameModel[]>> GetAsync([FromQuery]GameQueryFilter query, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken))?.Id;

            var filter = query.ToSearchFilter();
            filter.Sort = x => x.Id;
            filter.SortDirection = SortDirection.Descending;

            var result = await _gameService.GetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GameModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id;
            var game = await _gameService.GetGameByIdAsync(id, userId, cancellationToken: cancellationToken);

            return game;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<GameModel>> PostAsync(GameCreateModel model, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;

            var game = new GameCreateModel
            {
                DeckId = model.DeckId,
                Type = model.Type,
                Users = new UserModel[] { new UserModel { Id = userId } },
            };

            var newGame = await _gameService.CreateGameAsync(game, cancellationToken: cancellationToken);

            return CreatedAtAction(nameof(GetByIdAsync), new { id = newGame.Id }, newGame);
        }

        [HttpPost("{id:int}/join")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Join(int id, [FromBody]GameJoinModel model, CancellationToken cancellationToken = default)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);
            model.UserId = user.Id;

            await _gameService.AddUserToGameAsync(id, model, cancellationToken: cancellationToken);

            return Ok();
        }
    }
}
