using System;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/store")]
    public class StoreApiController : CardHeroControllerBase
    {
        private readonly ICardService _cardService;
        private readonly IStoreItemService _storeItemService;

        public StoreApiController(IUserService userService, ICardService cardService, IStoreItemService storeItemService)
            : base(userService)
        {
            _cardService = cardService;
            _storeItemService = storeItemService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<StoreItemModel[]>> GetAsync([FromQuery]StoreItemQueryFilter query)
        {
            var filter = query.ToSearchFilter();

            var result = await _storeItemService.GetStoreItemsAsync(filter);

            var storeItems = result.Results
                .OrderBy(x => (x.Expiry ?? DateTime.MaxValue))
                .ThenBy(x => x.Cost)
                .ToArray()
            ;

            return storeItems;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CardCollectionModel[]>> BuyStoreItemAsync(StoreItemModel storeItem)
        {
            var user = await GetUserAsync();

            var results = await _storeItemService.BuyStoreItemAsync(storeItem, user.Id);
            var cardIds = results.Select(x => x.Id).ToArray();

            var newCards = await _cardService.AddCardsToCardCollectionAsync(cardIds, user.Id);

            return new ObjectResult(newCards) { StatusCode = StatusCodes.Status201Created };
        }
    }
}
