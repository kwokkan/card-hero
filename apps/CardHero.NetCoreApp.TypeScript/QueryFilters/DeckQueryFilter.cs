using CardHero.Core.Abstractions;

namespace CardHero.NetCoreApp.TypeScript
{
    public class DeckQueryFilter : QueryFilterBase
    {
        public int[] Ids { get; set; }

        public string Name { get; set; }

        public DeckSearchFilter ToSearchFilter()
        {
            return new DeckSearchFilter
            {
                Ids = this.Ids,
                Name = this.Name,
                Page = this.Page,
                PageSize = this.PageSize,
            };
        }
    }
}
