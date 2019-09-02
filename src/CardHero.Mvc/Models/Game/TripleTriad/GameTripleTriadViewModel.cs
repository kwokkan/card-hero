using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardHero.Mvc.Models
{
    public class GameTripleTriadViewModel
    {
        public int Columns { get; set; }

        public int Rows { get; set; }

        public IEnumerable<GameTripleTriadMoveViewModel> Moves { get; set; }
    }
}
