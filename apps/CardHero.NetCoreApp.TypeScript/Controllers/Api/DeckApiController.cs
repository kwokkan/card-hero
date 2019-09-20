using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/decks")]
    [Authorize]
    public class DeckApiController : CardHeroControllerBase
    {
        private readonly IDeckService _deckService;

        public DeckApiController(IUserService userService, IDeckService deckService)
            : base(userService)
        {
            _deckService = deckService;
        }

        public async Task<ActionResult<DeckModel[]>> GetAsync(DeckSearchFilter filter)
        {
            filter.UserId = (await GetUserAsync())?.Id;

            var result = await _deckService.GetDecksAsync(filter);

            return result.Results;
        }

        [HttpPost("")]
        public async Task<ActionResult<DeckModel>> CreateAsync(DeckModel model)
        {
            var deck = new DeckModel
            {
                Description = model.Description,
                MaxCards = 5,
                Name = model.Name,
            };

            var userId = (await GetUserAsync()).Id;
            var newDeck = await _deckService.CreateDeckAsync(deck, userId);

            return newDeck;
        }
    }
}
