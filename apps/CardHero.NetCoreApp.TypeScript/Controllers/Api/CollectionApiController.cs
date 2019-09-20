using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
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

        public async Task<ActionResult<CardCollectionModel[]>> GetAsync(CardCollectionSearchFilter filter)
        {
            filter.UserId = (await GetUserAsync())?.Id;

            var result = await _cardService.GetCardCollectionAsync(filter);

            return result.Results;
        }
    }
}
