using System.Collections.Generic;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class CardSearchViewModel : SortableViewModel
    {
        public string Name { get; set; }

        public IEnumerable<CardViewModel> Cards { get; set; }
    }
}
