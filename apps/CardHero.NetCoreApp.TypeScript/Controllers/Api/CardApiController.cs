using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

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
        [ProducesErrorResponseType(typeof(ErrorViewModel))]
        public async Task<ActionResult<CardModel[]>> GetAsync([FromQuery]CardQueryFilter query)
        {
            var filter = new CardSearchFilter
            {
                Ids = query.Ids,
                Name = query.Name,
                Page = query.Page,
                PageSize = query.PageSize,
            };
            filter.UserId = (await GetUserAsync())?.Id;

            var result = await _cardService.GetCardsAsync(filter);

            return result.Results;
        }
    }
}
