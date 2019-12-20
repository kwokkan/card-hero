using CardHero.Core.Abstractions;

namespace CardHero.NetCoreApp.TypeScript
{
    public class CardCollectionQueryFilter : QueryFilterBase
    {
        public string Name { get; set; }

        public int[] Ids { get; set; }

        public CardCollectionSearchFilter ToSearchFilter()
        {
            return new CardCollectionSearchFilter
            {
                Ids = this.Ids,
                Name = this.Name,
                Page = this.Page,
                PageSize = this.PageSize,
            };
        }
    }
}
