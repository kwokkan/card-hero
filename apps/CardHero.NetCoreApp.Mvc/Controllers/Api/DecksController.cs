using System.Collections.Generic;
using System.Threading;
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
        public async Task<bool> FavouriteAsync(int id, CancellationToken cancellationToken)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);

            var result = await _deckService.ToggleFavouriteAsync(id, user.Id, cancellationToken: cancellationToken);

            return result;
        }

        [HttpPost("collection/{id:int}")]
        [Authorize]
        public async Task PostCollectionAsync(int id, IEnumerable<int> cardCollectionIds, CancellationToken cancellationToken)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);

            await _deckService.UpdateCollectionAsync(id, user.Id, cardCollectionIds, cancellationToken: cancellationToken);
        }
    }
}
