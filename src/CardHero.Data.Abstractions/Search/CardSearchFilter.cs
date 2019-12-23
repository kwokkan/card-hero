namespace CardHero.Data.Abstractions
{
    public class CardSearchFilter
    {
        public int[] Ids { get; set; }

        public string Name { get; set; }

        public int? UserId { get; set; }

        public int? PageSize { get; set; }
    }
}
