using System.Threading.Tasks;

using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers.Api
{
    [Route("api/gameplay")]
    public class GamePlayApiController : BaseController
    {
        private readonly IGamePlayService _gamePlayService;

        public GamePlayApiController(IGamePlayService gamePlayService)
        {
            _gamePlayService = gamePlayService;
        }

        [HttpPost("move")]
        public async Task MoveAsync([FromBody]MoveViewModel model)
        {
            var move = new MoveModel
            {
                CardCollectionId = model.CardCollectionId,
                Column = model.Column,
                GameId = model.GameId,
                Row = model.Row,
            };

            await _gamePlayService.MakeMoveAsync(move);
        }
    }
}
