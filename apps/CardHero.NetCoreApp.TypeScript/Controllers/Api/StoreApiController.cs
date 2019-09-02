using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

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
        public async Task<IEnumerable<StoreItem>> GetAsync(StoreItemSearchFilter filter)
        {
            var result = await _storeItemService.GetStoreItemsAsync(filter);

            var storeItems = result.Results
                .OrderBy(x => (x.Expiry ?? DateTime.MaxValue))
                .ThenBy(x => x.Cost)
                .AsEnumerable()
                ;

            return storeItems;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<CardCollection>>> BuyStoreItemAsync([FromBody]StoreItem storeItem)
        {
            var user = await GetUserAsync();

            var results = await _storeItemService.BuyStoreItemAsync(storeItem, user.Id);
            var cardIds = results.Select(x => x.Id).ToArray();

            var newCards = await _cardService.AddCardsToCardCollectionAsync(cardIds, user.Id);

            return Ok(newCards);
        }
    }
}