﻿using CardHero.Data.SqlServer;

using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroDataSqlServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCardHeroDataSqlServerDbContext(configuration);

            services.AddCardHeroDataSqlServerMappers();

            services.AddCardHeroDataSqlServerRepositories();

            return services;
        }

        private static IServiceCollection AddCardHeroDataSqlServerDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CardHeroSqlServerConnection");
            var options = new CardHeroDataDbOptions
            {
                ConnectionString = connectionString,
            };

            services.AddScoped(x => options);

            return services;
        }

        private static IServiceCollection AddCardHeroDataSqlServerMappers(this IServiceCollection services)
        {
            return services;
        }

        private static IServiceCollection AddCardHeroDataSqlServerRepositories(this IServiceCollection services)
        {
            return services;
        }
    }
}
