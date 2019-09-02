using System.Collections.Generic;
using System.Threading.Tasks;
using CardHero.Core.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers.Api
{
    [Route("api/[controller]")]
    public class DecksController : CardHeroController
    {
        private readonly IDeckService _deckService;

        public DecksController(IUserService userService, IDeckService deckService)
            : base(userService)
        {
            _deckService = deckService;
        }

        [HttpPost("favourite/{id:int}")]
        [Authorize]
        public async Task<bool> FavouriteAsync(int id)
        {
            var user = await GetUserAsync();

            var result = _deckService.ToggleFavourite(id, user.Id);

            return result;
        }

        [HttpPost("collection/{id:int}")]
        [Authorize]
        public async Task PostCollectionAsync(int id, IEnumerable<int> cardCollectionIds)
        {
            var user = await GetUserAsync();

            _deckService.UpdateCollection(id, user.Id, cardCollectionIds);
        }
    }
}