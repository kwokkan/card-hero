using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/cards")]
    public class CardApiController : CardHeroControllerBase
    {
        private readonly ICardService _cardService;

        public CardApiController(IUserService userService, ICardService cardService)
            : base(userService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CardModel[]>> GetAsync([FromQuery]CardQueryFilter query, CancellationToken cancellationToken)
        {
            var filter = query.ToSearchFilter();
            filter.UserId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id;

            var result = await _cardService.GetCardsAsync(filter, cancellationToken: cancellationToken);

            return result.Results;
        }

        [HttpPost("{id:int}/favourite")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> FavouriteAsync(int id, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;

            await _cardService.ToggleFavouriteAsync(id, userId, cancellationToken: cancellationToken);

            return Ok();
        }
    }
}
