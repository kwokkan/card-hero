using System.Linq;
using System.Threading.Tasks;
using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    public class CardController : BaseController
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        public virtual async Task<IActionResult> IndexAsync(SearchCardViewModel model)
        {
            var filter = new CardSearchFilter
            {
                Page = model.Page,
                PageSize = model.PageSize,
                Name = model.Name,
            };
            ApplySortable(filter);
            var cards = await _cardService.GetCardsAsync(filter);

            model.Cards = cards.Results.Select(x => new CardViewModel
            {
                Id = x.Id,
                Name = x.Name,
            });

            return View(model);
        }
    }
}