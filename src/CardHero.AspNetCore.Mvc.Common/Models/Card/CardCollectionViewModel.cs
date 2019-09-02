namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class CardCollectionViewModel
    {
		public int Id { get; set; }

		public CardViewModel Card { get; set; }

		public int Count { get; set; }
	}
}
