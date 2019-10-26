using System.Collections.Generic;
using System.Collections.ObjectModel;

using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameTripleTriadViewModel
    {
        public int Rows { get; set; }

        public int Columns { get; set; }

        public IEnumerable<GameTripleTriadMoveViewModel> Moves { get; set; }

        public ReadOnlyCollection<CardModel> PlayedCards { get; set; }
    }
}
