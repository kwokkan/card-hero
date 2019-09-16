using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/games")]
    public class GameApiController : CardHeroControllerBase
    {
        private readonly IGamePlayService _gamePlayService;
        private readonly IGameService _gameService;
        private readonly IMoveService _moveService;

        public GameApiController(IUserService userService, IGamePlayService gamePlayService, IGameService gameService, IMoveService moveService)
            : base(userService)
        {
            _gamePlayService = gamePlayService;
            _gameService = gameService;
            _moveService = moveService;
        }

        [HttpGet]
        public async Task<IEnumerable<GameModel>> GetAsync(GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            var userId = (await GetUserAsync())?.Id;

            filter.Sort = x => x.Id;
            filter.SortDirection = KwokKan.Sortable.SortDirection.Descending;

            var result = await _gameService.NewGetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<GameViewModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync())?.Id;
            var game = await _gameService.GetGameByIdAsync(id, userId, cancellationToken: cancellationToken);
            var moves = await _moveService.GetMovesAsync(id);

            var data = new GameTripleTriadViewModel
            {
                Columns = game.Columns,
                Moves = moves.Select(x => new GameTripleTriadMoveViewModel
                {
                    CardCollectionId = x.CardCollectionId,
                    Column = x.Column,
                    Row = x.Row,
                }).ToList(),
                Rows = game.Rows,
            };

            var model = new GameViewModel(game)
            {
                Data = data,
            };

            return model;
        }

        [HttpPost]
        public async Task<ActionResult<GameModel>> PostAsync([FromBody]GameModel model, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync()).Id;

            var game = new GameCreateModel
            {
                DeckId = model.DeckId,
                Name = model.Name,
                Type = model.Type,
                Users = new UserModel[] { new UserModel { Id = userId } },
            };

            var newGame = await _gameService.CreateGameAsync(game, cancellationToken: cancellationToken);

            return newGame;
        }

        [HttpPost("{id:int}/join")]
        public async Task<ActionResult<GameUserModel>> Join(int id, [FromBody]JoinGameViewModel model, CancellationToken cancellationToken = default)
        {
            var user = await GetUserAsync();

            var result = await _gameService.AddUserToGameAsync(id, user.Id, model.DeckId, cancellationToken: cancellationToken);

            return result;
        }

        [HttpPost("{id:int}/move")]
        public async Task<ActionResult<GameTripleTriadMoveViewModel>> MoveAsync(int id, [FromBody]GameTripleTriadMoveViewModel model)
        {
            var user = await GetUserAsync();

            var move = new MoveModel
            {
                CardCollectionId = model.CardCollectionId,
                Column = model.Column,
                GameId = id,
                Row = model.Row,
                UserId = user.Id,
            };
            await _gamePlayService.MakeMoveAsync(move);

            return model;
        }
    }
}
