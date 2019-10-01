using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.NetCoreApp.Mvc.Models;

using KwokKan.Sortable;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers
{
    [Route("[controller]")]
    public class CardController : CardHeroController
    {
        private readonly ICardService _cardService;
        private readonly ISortableHelper _sortableHelper;

        public CardController(IUserService userService, ICardService cardService, ISortableHelper sortableHelper)
            : base(userService)
        {
            _cardService = cardService;
            _sortableHelper = sortableHelper;
        }

        public async Task<IActionResult> Index(CardSearchViewModel model, CancellationToken cancellationToken)
        {
            var filter = new CardSearchFilter
            {
                Page = model.Page,
                PageSize = model.PageSize,
                Name = model.Name,
                UserId = (await GetUserAsync())?.Id,
            };
            _sortableHelper.ApplySortable(filter, model.Sort, model.SortDir);

            var result = await _cardService.GetCardsAsync(filter, cancellationToken: cancellationToken);

            model.Cards = result.Results.Select(x => new CardViewModel().FromCard(x));
            model.Total = result.Count;

            return View(model);
        }

        [Route("{id:int}")]
        public async Task<IActionResult> View(int id, CancellationToken cancellationToken)
        {
            var filter = new CardSearchFilter
            {
                Ids = new[] { id },
                UserId = (await GetUserAsync())?.Id,
            };

            var card = (await _cardService.GetCardsAsync(filter, cancellationToken: cancellationToken)).Results.FirstOrDefault();

            var model = new CardViewModel().FromCard(card);

            return View(model);
        }
    }
}
