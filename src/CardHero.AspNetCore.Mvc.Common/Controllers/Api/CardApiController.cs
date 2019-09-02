using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardHero.AspNetCore.Mvc.Common.Models;
using CardHero.Core.Abstractions;

namespace CardHero.AspNetCore.Mvc.Common.Controllers.Api
{
    public class CardApiController : BaseController
	{
		private readonly ICardService _cardService;

		public CardApiController(ICardService cardService)
		{
			_cardService = cardService;
		}

		public virtual async Task<IEnumerable<CardViewModel>> GetAsync(SearchCardViewModel model)
		{
			var filter = new CardSearchFilter
			{
				Page = model.Page,
				PageSize = model.PageSize,
				Name = model.Name
			};
			ApplySortable(filter);
			var cards = await _cardService.GetCardsAsync(filter);
			var result = cards.Results.Select(x => new CardViewModel
			{
				Id = x.Id,
				Name = x.Name
			});

			return result;
		}
	}
}
