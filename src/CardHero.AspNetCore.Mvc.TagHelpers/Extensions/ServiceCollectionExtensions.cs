using CardHero.AspNetCore.Mvc.TagHelpers;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureTagHelpers(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.Configure<AssetTagHelperOptions>(options =>
            {
                var config = configuration.GetSection("Assets");
                options.BaseUrl = config.GetSection("BaseUrl").Value;
            });

            return services;
        }
    }
}
