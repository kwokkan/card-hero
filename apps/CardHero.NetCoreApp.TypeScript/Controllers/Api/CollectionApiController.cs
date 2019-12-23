using System.Threading;
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
        private readonly ICardCollectionService _cardCollectionService;

        public CollectionApiController(IUserService userService, ICardCollectionService cardCollectionService)
            : base(userService)
        {
            _cardCollectionService = cardCollectionService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CardCollectionModel[]>> GetAsync([FromQuery]CardCollectionQueryFilter query, CancellationToken cancellationToken)
        {
            var filter = query.ToSearchFilter();
            filter.UserId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;

            var result = await _cardCollectionService.GetCardCollectionAsync(filter, cancellationToken: cancellationToken);

            return result.Results;
        }
    }
}
