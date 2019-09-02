using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using KwokKan.Sortable;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class DeckViewModel : ISortable
    {
        [Sortable("Default")]
        public int Id { get; set; }

        [Sortable]
        public string Name { get; set; }

        public string Description { get; set; }

        [Display(Name = "Max Cards")]
        public int MaxCards { get; set; }

        [Display(Name = "Is Favourited")]
        public bool IsFavourited { get; set; }

        public IEnumerable<CardCollectionViewModel> Cards { get; set; }
    }
}
