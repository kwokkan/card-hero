using KwokKan.Sortable;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class CardViewModel : ISortable
	{
		[HiddenInput(DisplayValue = true)]
		[Sortable("Default")]
		public int Id { get; set; }

		[Sortable]
		public string Name { get; set; }
	}
}
