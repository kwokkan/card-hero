using KwokKan.Sortable;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection UseCardHeroServices(this IServiceCollection services)
        {
            services
                .AddScoped<ISortableHelper, SortableHelper>()
            ;

            return services;
        }
    }
}
