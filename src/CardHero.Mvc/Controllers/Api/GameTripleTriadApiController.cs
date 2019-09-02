using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardHero.Mvc.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TripleTriad.Core.Models;
using TripleTriad.Core.Services;

namespace CardHero.Mvc.Controllers.Api
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
            var user = await GetUser();
            var move = new Move
            {
                CardCollectionId = model.CardCollectionId.Value,
                Column = model.Column.Value,
                GameId = id,
                Row = model.Row.Value,
                UserId = user.Id
            };
            _gamePlayService.MakeMove(move);

            return model;
        }
    }
}