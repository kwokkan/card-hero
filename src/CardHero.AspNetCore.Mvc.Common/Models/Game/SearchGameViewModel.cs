using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class SearchGameViewModel
	{
		public int Page { get; set; }

		public int PageSize { get; set; }

		public string Sort { get; set; }

		public string SortDir { get; set; }

		[Display(Name = "Start Time")]
		public DateTime? StartTime { get; set; }

		[Display(Name = "End Time")]
		public DateTime? EndTime { get; set; }

		[Display(Name = "Active?")]
		public bool ActiveOnly { get; set; } = true;

		public IEnumerable<GameViewModel> Games { get; set; }
	}
}
