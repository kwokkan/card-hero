namespace CardHero.NetCoreApp.TypeScript
{
    public class CardQueryFilter : QueryFilterBase
    {
        public int[] Ids { get; set; }

        public string Name { get; set; }
    }
}
