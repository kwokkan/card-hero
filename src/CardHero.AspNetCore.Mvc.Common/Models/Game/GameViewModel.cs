using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using KwokKan.Sortable;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class GameViewModel : ISortable
    {
        [HiddenInput(DisplayValue = true)]
        [Sortable("Default", Order = -1)]
        public int Id { get; set; }

        [Display(Name = "Start Time")]
        [Sortable]
        public DateTime StartTime { get; set; }

        [Display(Name = "End Time")]
        [Sortable]
        public DateTime? EndTime { get; set; }

        public bool IsActive { get; set; }

        public int Rows { get; set; }

        public int Columns { get; set; }
    }
}
