using System.Collections.Generic;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class DeckSearchViewModel : SortableViewModel
    {
        public string Name { get; set; }

        public IEnumerable<DeckViewModel> Decks { get; set; }
    }
}
