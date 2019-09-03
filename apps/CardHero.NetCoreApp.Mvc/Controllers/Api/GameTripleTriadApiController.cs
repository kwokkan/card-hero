using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.NetCoreApp.Mvc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers.Api
{
    [Route("api/games/tripletriad")]
    [Authorize]
    public class GameTripleTriadApiController : CardHeroController
    {
        private readonly IGamePlayService _gamePlayService;

        public GameTripleTriadApiController(IUserService userService, IGamePlayService gamePlayService)
            : base(userService)
        {
            _gamePlayService = gamePlayService;
        }

        [HttpPost("{id:int}/[action]")]
        public async Task<GameTripleTriadMoveViewModel> Move(int id, [FromBody]GameTripleTriadMoveViewModel model)
        {
            var user = await GetUserAsync();
            var move = new Move
            {
                CardCollectionId = model.CardCollectionId.Value,
                Column = model.Column.Value,
                GameId = id,
                Row = model.Row.Value,
                UserId = user.Id,
            };
            await _gamePlayService.MakeMoveAsync(move);

            return model;
        }
    }
}