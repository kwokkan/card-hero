using CardHero.Core.Abstractions;

namespace CardHero.NetCoreApp.TypeScript
{
    public class CardQueryFilter : QueryFilterBase
    {
        public int[] Ids { get; set; }

        public string Name { get; set; }

        public CardSearchFilter ToSearchFilter()
        {
            return new CardSearchFilter
            {
                Ids = this.Ids,
                Name = this.Name,
                Page = this.Page,
                PageSize = this.PageSize,
            };
        }
    }
}
