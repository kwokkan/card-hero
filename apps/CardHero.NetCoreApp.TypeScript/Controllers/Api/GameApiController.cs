﻿using System;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Http;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GameModel[]>> GetAsync([FromQuery]GameQueryFilter query)
        {
            var filter = query.ToSearchFilter();
            filter.Sort = x => x.Id;
            filter.SortDirection = KwokKan.Sortable.SortDirection.Descending;

            var result = await _gameService.GetGamesAsync(filter);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<GameModel>> PostAsync(GameModel model)
        {
            var userId = (await GetUserAsync()).Id;

            var game = new GameModel
            {
                DeckId = model.DeckId,
                Name = model.Name,
                Type = model.Type,
                StartTime = DateTime.UtcNow,
                Users = new UserModel[] { new UserModel { Id = userId } },
            };

            var newGame = await _gameService.CreateGameAsync(game);

            return CreatedAtAction(nameof(GetByIdAsync), new { id = newGame.Id }, newGame);
        }

        [HttpPost("{id:int}/move")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GameTripleTriadMoveViewModel>> MoveAsync(int id, GameTripleTriadMoveViewModel model)
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
