using System.Collections.Generic;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class DeckViewModel
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public int MaxCards { get; set; }

		public IEnumerable<DeckCardCollectionViewModel> Cards { get; set; }
	}
}
