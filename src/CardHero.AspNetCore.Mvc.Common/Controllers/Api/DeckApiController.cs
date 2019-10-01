using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers.Api
{
    [Route("api/decks")]
    [Authorize]
    public class DeckApiController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IDeckService _deckService;

        public DeckApiController(IUserService userService, IDeckService deckService)
        {
            _userService = userService;
            _deckService = deckService;
        }

        private async Task<UserModel> GetUserAsync(CancellationToken cancellationToken)
        {
            if (User.Identity.IsAuthenticated)
            {
                var sub = User.FindFirst("sub")?.Value;
                var idp = User.FindFirst("idp")?.Value;

                var user = await _userService.GetUserByIdentifierAsync(sub, idp, cancellationToken: cancellationToken);

                if (user == null)
                {
                    var name = User.FindFirst("name")?.Value;

                    user = await _userService.CreateUserAsync(sub, idp, name, cancellationToken: cancellationToken);
                }

                return user;
            }

            return null;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<DeckViewModel>> GetDecksAsync()
        {
            var filter = new DeckSearchFilter();
            var decks = await _deckService.GetDecksAsync(filter);
            var result = decks.Results.Select(x => new DeckViewModel
            {
                Id = x.Id,
                Name = x.Name,
                MaxCards = x.MaxCards,
                Cards = x.Cards.Select(y => new DeckCardCollectionViewModel
                {
                    Id = y.Id,
                    Name = y.Name,
                    DeckCardCollectionId = y.CardCollectionId,
                }),
            });

            return result;
        }

        [HttpPost]
        [Route("")]
        public async Task<DeckModel> PostDeckAsync([FromBody]DeckViewModel model, CancellationToken cancellationToken)
        {
            var deck = new DeckModel
            {
                Name = model.Name,
                MaxCards = model.MaxCards,
            };
            var user = await GetUserAsync(cancellationToken: cancellationToken);
            var result = await _deckService.CreateDeckAsync(deck, user.Id);

            return result;
        }
    }
}
