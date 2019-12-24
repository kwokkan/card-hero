namespace CardHero.Data.Abstractions
{
    public class CardData
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UpAttack { get; set; }

        public int RightAttack { get; set; }

        public int DownAttack { get; set; }

        public int LeftAttack { get; set; }

        public int Health { get; set; }

        public int Attack { get; set; }

        public int Defence { get; set; }

        public int TotalStats { get; set; }

        public bool IsFavourited { get; set; }

        public RarityData Rarity { get; set; }
    }
}
