namespace CardHero.Data.Abstractions
{
    public class CardCollectionSearchFilter
    {
        public int[] Ids { get; set; }

        public string CardName { get; set; }

        public int? UserId { get; set; }
    }
}
