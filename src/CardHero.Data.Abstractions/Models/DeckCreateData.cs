namespace CardHero.Data.Abstractions
{
    public class DeckCreateData
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public int MaxCards { get; set; }
    }
}
