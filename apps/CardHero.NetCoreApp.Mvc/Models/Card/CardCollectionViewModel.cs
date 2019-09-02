namespace CardHero.NetCoreApp.Mvc.Models
{
    public class CardCollectionViewModel
    {
        public int CardCollectionId { get; set; }

        public CardViewModel Card { get; set; }

        public bool IsUsable { get; set; } = true;
    }
}
