using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    [Authorize]
    public class DeckController : BaseController
    {
        private readonly ICardService _cardService;
        private readonly IDeckService _deckService;

        public DeckController(ICardService cardService, IDeckService deckService)
        {
            _cardService = cardService;
            _deckService = deckService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> DetailsAsync(int id, CancellationToken cancellationToken)
        {
            var deck = await _deckService.GetDeckByIdAsync(id, cancellationToken: cancellationToken);
            var cardFilter = new CardCollectionSearchFilter
            {
            };
            var ownedCards = await _cardService.GetCardCollectionAsync(cardFilter, cancellationToken: cancellationToken);

            var model = new EditDeckViewModel
            {
                Cards = deck.Cards.Select(x => new DeckCardCollectionViewModel
                {
                    DeckCardCollectionId = x.Id,
                    Id = x.CardCollectionId,
                    Name = x.Name,
                }),
                Id = deck.Id,
                MaxCards = deck.MaxCards,
                Name = deck.Name,
                OwnedCards = ownedCards.Results.Select(x => new CardCollectionViewModel
                {
                    Card = new CardViewModel
                    {
                        Id = x.CardId,
                        Name = x.Card.Name,
                    },
                    Id = x.Id,
                }),
            };

            return View(model);
        }
    }
}
