using System.Collections.Generic;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class DeckEditViewModel
    {
        public DeckViewModel Deck { get; set; }

        public CardSearchViewModel OwnedCardSearch { get; set; }

        public IEnumerable<CardCollectionViewModel> OwnedCards { get; set; }

        public IEnumerable<CardCollectionViewModel> UsedCards { get; set; }
    }
}
