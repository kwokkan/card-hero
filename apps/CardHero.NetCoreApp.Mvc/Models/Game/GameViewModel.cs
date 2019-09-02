using System;
using System.ComponentModel.DataAnnotations;
using KwokKan.Sortable;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class GameViewModel : ISortable
    {
        [Sortable("Default")]
        public int Id { get; set; }

        [Sortable]
        public string Name { get; set; }

        [Display(Name = "Start Time")]
        [Sortable]
        public DateTime StartTime { get; set; }

        [Sortable]
        public CardHero.Core.Models.GameType Type { get; set; }

        public DeckViewModel Deck { get; set; }

        public object Data { get; set; }
    }
}
