using CardHero.Core.Abstractions;

namespace CardHero.NetCoreApp.TypeScript
{
    public class StoreItemQueryFilter : QueryFilterBase
    {
        public StoreItemSearchFilter ToSearchFilter()
        {
            return new StoreItemSearchFilter
            {
                Page = this.Page,
                PageSize = this.PageSize,
            };
        }
    }
}
