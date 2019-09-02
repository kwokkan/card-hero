using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class GameCreateViewModel
    {
        public string Name { get; set; }

        public CardHero.Core.Models.GameType Type { get; set; }

        [Required]
        public int? SelectedDeckId { get; set; }

        public IEnumerable<DeckViewModel> Decks { get; set; }
    }
}
