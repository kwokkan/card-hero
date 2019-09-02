using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class GameTripleTriadMoveViewModel
    {
        public int? Row { get; set; }

        public int? Column { get; set; }

        public int? CardCollectionId { get; set; }
    }
}
