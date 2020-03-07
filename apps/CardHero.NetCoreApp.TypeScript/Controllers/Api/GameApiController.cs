using System;
using System.Linq;
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
        private readonly ICardService _cardService;
        private readonly IGamePlayService _gamePlayService;
        private readonly IGameService _gameService;
        private readonly IMoveService _moveService;

        public GameApiController(IUserService userService, ICardService cardService, IGamePlayService gamePlayService, IGameService gameService, IMoveService moveService)
            : base(userService)
        {
            _cardService = cardService;
            _gamePlayService = gamePlayService;
            _gameService = gameService;
            _moveService = moveService;
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
        public async Task<ActionResult<GamePlayModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id;
            var game = await _gameService.GetGameByIdAsync(id, userId, cancellationToken: cancellationToken);
            var moves = await _moveService.GetMovesAsync(id, cancellationToken: cancellationToken);

            var cardFilter = new CardSearchFilter
            {
                Ids = moves.Select(x => x.CardId).ToArray(),
            };
            var playedCards = await _cardService.GetCardsAsync(cardFilter, cancellationToken: cancellationToken);

            var model = new GamePlayModel
            {
                Game = game,
                Moves = moves.Select(x => new MoveModel
                {
                    CardId = x.CardId,
                    GameDeckCardCollectionId = x.GameDeckCardCollectionId,
                    Column = x.Column,
                    Row = x.Row,
                }).ToList(),
                PlayedCards = Array.AsReadOnly(playedCards.Results),
            };

            return model;
        }

        [HttpPost]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Join(int id, [FromBody]GameJoinModel model, CancellationToken cancellationToken = default)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);
            model.UserId = user.Id;

            await _gameService.AddUserToGameAsync(id, model, cancellationToken: cancellationToken);

            return Ok();
        }

        [HttpPost("{id:int}/move")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MoveModel>> MoveAsync(int id, [FromBody]MoveModel model, CancellationToken cancellationToken)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);

            var move = new MoveModel
            {
                GameDeckCardCollectionId = model.GameDeckCardCollectionId,
                Column = model.Column,
                GameId = id,
                Row = model.Row,
                UserId = user.Id,
            };
            await _gamePlayService.MakeMoveAsync(move, cancellationToken: cancellationToken);

            return model;
        }
    }
}
