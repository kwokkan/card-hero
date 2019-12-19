namespace CardHero.Data.Abstractions
{
    public class DeckSearchFilter
    {
        public int[] Ids { get; set; }

        public string Name { get; set; }

        public int? UserId { get; set; }
    }
}
