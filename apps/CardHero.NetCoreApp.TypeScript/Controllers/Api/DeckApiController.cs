using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/decks")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class DeckApiController : CardHeroControllerBase
    {
        private readonly IDeckService _deckService;

        public DeckApiController(IUserService userService, IDeckService deckService)
            : base(userService)
        {
            _deckService = deckService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DeckModel[]>> GetAsync([FromQuery]DeckQueryFilter query, CancellationToken cancellationToken)
        {
            var filter = query.ToSearchFilter();
            filter.UserId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id;

            var result = await _deckService.GetDecksAsync(filter);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DeckModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _deckService.GetDeckByIdAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DeckModel>> CreateAsync(DeckModel model, CancellationToken cancellationToken)
        {
            var deck = new DeckModel
            {
                Description = model.Description,
                MaxCards = 5,
                Name = model.Name,
            };

            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;
            var newDeck = await _deckService.CreateDeckAsync(deck, userId);

            return CreatedAtAction(nameof(GetByIdAsync), new { id = newDeck.Id }, newDeck);
        }
    }
}
