namespace CardHero.Data.Abstractions
{
    public class DeckData
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UserId { get; set; }

        public int MaxCards { get; set; }

        public DeckCardData[] Cards { get; set; }
    }
}
