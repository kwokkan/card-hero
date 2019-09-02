using System.Collections.Generic;

namespace CardHero.NetCoreApp.TypeScript.Models
{
    public class GameTripleTriadViewModel
    {
        public int Rows { get; set; }

        public int Columns { get; set; }

        public IEnumerable<GameTripleTriadMoveViewModel> Moves { get; set; }
    }
}
