using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.NetCoreApp.Mvc.Extensions;
using CardHero.NetCoreApp.Mvc.Models;

using KwokKan.Sortable;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class DeckController : CardHeroController
    {
        private readonly IDeckService _deckService;
        private readonly ICardService _cardService;
        private readonly ISortableHelper _sortableHelper;

        public DeckController(IUserService userService, IDeckService deckService, ICardService cardService, ISortableHelper sortableHelper)
            : base(userService)
        {
            _deckService = deckService;
            _cardService = cardService;
            _sortableHelper = sortableHelper;
        }

        public async Task<IActionResult> Index(DeckSearchViewModel model, CancellationToken cancellationToken)
        {
            var filter = new DeckSearchFilter
            {
                Page = model.Page,
                PageSize = model.PageSize,
                Name = model.Name,
                UserId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id,
            };
            _sortableHelper.ApplySortable(filter, model.Sort, model.SortDir);

            var result = await _deckService.GetDecksAsync(filter, cancellationToken: cancellationToken);

            model.Decks = result.Results.Select(x => new DeckViewModel().FromDeck(x));
            model.Total = result.Count;

            return View(model);
        }

        [Route("{id:int}")]
        public async Task<IActionResult> View(int id, CancellationToken cancellationToken)
        {
            var user = await GetUserAsync(cancellationToken: cancellationToken);
            var filter = new DeckSearchFilter
            {
                Ids = new[] { id },
                UserId = user?.Id,
            };

            var deck = (await _deckService.GetDecksAsync(filter, cancellationToken: cancellationToken)).Results.FirstOrDefault();
            var deckVm = new DeckViewModel().FromDeck(deck);

            var cardCollectionFilter = new CardCollectionSearchFilter
            {
                UserId = user?.Id,
            };
            var cardCollection = await _cardService.GetCardCollectionAsync(cardCollectionFilter, cancellationToken: cancellationToken);

            var usedCards = deck.Cards.Select(x => new CardCollectionViewModel().FromDeckCard(x));
            var usedCardIds = usedCards.Select(x => x.CardCollectionId);
            var ownedCards = cardCollection.Results.Where(x => !usedCardIds.Contains(x.Id)).Select(x => new CardCollectionViewModel().FromCardCollection(x));

            var model = new DeckEditViewModel
            {
                Deck = deckVm,
                OwnedCards = ownedCards,
                UsedCards = usedCards,
            };

            return View(model);
        }

        [Route("[action]")]
        public IActionResult Create()
        {
            var model = new DeckCreateViewModel
            {
            };

            if (Request.IsAjaxRequest())
            {
                return PartialView(model);
            }

            return View(model);
        }

        [HttpPost("[action]")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(DeckCreateViewModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var deck = new DeckModel
                {
                    Description = model.Description,
                    MaxCards = 5,
                    Name = model.Name,
                };
                var userId = (await GetUserAsync(cancellationToken: cancellationToken)).Id;
                var newDeck = await _deckService.CreateDeckAsync(deck, userId, cancellationToken: cancellationToken);

                var url = Url.Action("View", new { id = newDeck.Id });

                return Json(new JsonViewModel
                {
                    RedirectUrl = url,
                });
            }

            return View(model);
        }
    }
}
