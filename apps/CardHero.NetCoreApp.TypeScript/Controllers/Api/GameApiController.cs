using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IEnumerable<Game>> GetAsync(GameSearchFilter filter)
        {
            filter.Sort = x => x.Id;
            filter.SortDirection = KwokKan.Sortable.SortDirection.Descending;

            var result = await _gameService.GetGamesAsync(filter);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<GameViewModel>> GetByIdAsync(int id)
        {
            var filter = new GameSearchFilter
            {
                GameId = id,
            };
            var game = (await _gameService.GetGamesAsync(filter)).Results.FirstOrDefault();
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

            foreach (var card in model.Deck.Cards)
            {
                //TODO: add card usable
            }

            return model;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> PostAsync([FromBody]Game model)
        {
            var userId = (await GetUserAsync()).Id;

            var game = new Game
            {
                DeckId = model.DeckId,
                Name = model.Name,
                Type = model.Type,
                StartTime = DateTime.UtcNow,
                Users = new User[] { new User { Id = userId } },
            };

            var newGame = await _gameService.CreateGameAsync(game);

            return newGame;
        }

        [HttpPost("{id:int}/move")]
        public async Task<ActionResult<GameTripleTriadMoveViewModel>> MoveAsync(int id, [FromBody]GameTripleTriadMoveViewModel model)
        {
            var user = await GetUserAsync();

            var move = new Move
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