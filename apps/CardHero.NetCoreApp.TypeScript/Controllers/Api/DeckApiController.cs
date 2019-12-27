using System.Linq;
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

            var result = await _deckService.GetDecksAsync(filter, cancellationToken: cancellationToken);

            return result.Results;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DeckModel>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _deckService.GetDeckByIdAsync(id, cancellationToken: cancellationToken);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<DeckModel>> CreateAsync(DeckCreateModel model, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;
            var newDeck = await _deckService.CreateDeckAsync(model, userId, cancellationToken: cancellationToken);

            return CreatedAtAction(nameof(GetByIdAsync), new { id = newDeck.Id }, newDeck);
        }

        [HttpPost("{id:int}/favourite")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> FavouriteAsync(int id, [FromBody]DeckModel model, CancellationToken cancellationToken)
        {
            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;

            await _deckService.FavouriteDeckAsync(id, userId, model.IsFavourited, cancellationToken: cancellationToken);

            return Ok();
        }

        [HttpPatch("{id:int}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> PatchAsync(int id, [FromBody]DeckModel model, CancellationToken cancellationToken)
        {
            //TODO: Use JsonPatch once models are better
            var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;
            var cardCollectionIds = model?.Cards?.Select(x => x.CardCollectionId).ToArray();

            await _deckService.UpdateCollectionAsync(id, userId, cardCollectionIds, cancellationToken: cancellationToken);

            return Ok();
        }
    }
}
