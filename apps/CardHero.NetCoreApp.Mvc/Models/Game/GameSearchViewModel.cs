using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class GameSearchViewModel : SortableViewModel
    {
        [Display(Name = "Created Date")]
        public DateTime CreatedDate { get; set; }

        [Display(Name = "Active Only")]
        public bool ActiveOnly { get; set; }

        public string Name { get; set; }

        public CardHero.Core.Models.GameType? Type { get; set; }

        public IEnumerable<GameViewModel> Games { get; set; }
    }
}
