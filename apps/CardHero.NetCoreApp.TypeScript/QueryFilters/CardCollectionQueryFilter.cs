using CardHero.Core.Abstractions;

namespace CardHero.NetCoreApp.TypeScript
{
    public class CardCollectionQueryFilter : QueryFilterBase
    {
        public int[] Ids { get; set; }

        public CardCollectionSearchFilter ToSearchFilter()
        {
            return new CardCollectionSearchFilter
            {
                Ids = this.Ids,
                Page = this.Page,
                PageSize = this.PageSize,
            };
        }
    }
}
