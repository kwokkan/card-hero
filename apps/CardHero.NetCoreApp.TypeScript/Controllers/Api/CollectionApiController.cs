using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/collections")]
    [Authorize]
    public class CollectionApiController : CardHeroControllerBase
    {
        private readonly ICardService _cardService;

        public CollectionApiController(IUserService userService, ICardService cardService)
            : base(userService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CardCollectionModel[]>> GetAsync([FromQuery]CardCollectionQueryFilter query)
        {
            var filter = query.ToSearchFilter();
            filter.UserId = (await GetUserAsync()).Id;

            var result = await _cardService.GetCardCollectionAsync(filter);

            return result.Results;
        }
    }
}
