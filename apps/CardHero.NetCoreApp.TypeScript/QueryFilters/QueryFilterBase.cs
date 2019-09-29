namespace CardHero.NetCoreApp.TypeScript
{
    public abstract class QueryFilterBase
    {
        public int? Page { get; set; } = 0;

        public int? PageSize { get; set; } = 10;

        public string Sort { get; set; }
    }
}
