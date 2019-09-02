using System.Collections.Generic;
using CardHero.Core.Models;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class CreateGameViewModel
    {
        public IEnumerable<int> PlayerIds { get; set; }

        public IEnumerable<User> Players { get; set; }
    }
}
