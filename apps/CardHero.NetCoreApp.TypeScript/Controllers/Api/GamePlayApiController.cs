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
    [Route("api/play")]
    public class GamePlayApiController : CardHeroControllerBase
    {
        private readonly ICardService _cardService;
        private readonly IGamePlayService _gamePlayService;
        private readonly IMoveService _moveService;
        private readonly IMoveUserService _moveUserService;

        public GamePlayApiController(
            IUserService userService,
            ICardService cardService,
            IGamePlayService gamePlayService,
            IMoveService moveService,
            IMoveUserService moveUserService
        )
            : base(userService)
        {
            _cardService = cardService;
            _gamePlayService = gamePlayService;
            _moveService = moveService;
            _moveUserService = moveUserService;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GamePlayModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id;
            var gamePlay = await _gamePlayService.GetGamePlayByIdAsync(id, userId, cancellationToken: cancellationToken);
            var moves = await _moveService.GetMovesAsync(id, cancellationToken: cancellationToken);

            var cardFilter = new CardSearchFilter
            {
                Ids = moves.Select(x => x.CardId).ToArray(),
            };
            var playedCards = await _cardService.GetCardsAsync(cardFilter, cancellationToken: cancellationToken);

            gamePlay.Moves = await _moveUserService.PopulateMoveUsersAsync(moves, playedCards.Results, gamePlay.Game.UserIds, cancellationToken: cancellationToken);

            gamePlay.PlayedCards = playedCards.Results;

            return gamePlay;
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
