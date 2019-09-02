using System.Collections.Generic;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class EditDeckViewModel : DeckViewModel
    {
		public IEnumerable<CardCollectionViewModel> OwnedCards { get; set; }
	}
}
