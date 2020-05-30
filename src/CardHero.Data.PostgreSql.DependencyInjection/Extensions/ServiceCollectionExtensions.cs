using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql;
using CardHero.Data.PostgreSql.DependencyInjection;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroDataPostgreSql(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CardHeroPostgreSqlConnection");

            if (!string.IsNullOrWhiteSpace(connectionString))
            {
                var connectionOptions = configuration.GetSection("ConnectionOptions:PostgreSql").Get<ConnectionOptions>() ?? new ConnectionOptions();
                services.AddCardHeroDataPostgreSqlDbContext(connectionString, connectionOptions);

                services.AddCardHeroDataPostgreSqlMappers();

                services.AddCardHeroDataPostgreSqlRepositories();
            }

            return services;
        }

        private static IServiceCollection AddCardHeroDataPostgreSqlDbContext(this IServiceCollection services, string connectionString, ConnectionOptions connectionOptions)
        {
            var connectionStringParser = new ConnectionStringParser();

            var parsedConnectionString = connectionStringParser.Parse(connectionString, connectionOptions);

            services.AddDbContext<CardHeroDataDbContext>(x =>
            {
                x.UseNpgsql(parsedConnectionString);
            });

            return services;
        }

        private static IServiceCollection AddCardHeroDataPostgreSqlMappers(this IServiceCollection services)
        {
            services
                .AddScoped<IMapper<CardCollection, CardCollectionData>, CardCollectionMapper>()
                .AddScoped<IMapper<Card, CardModel>, CardMapper>()
                .AddScoped<IMapper<CardPack, CardPackModel>, CardPackMapper>()
                .AddScoped<IMapper<Deck, DeckData>, DeckMapper>()
                .AddScoped<IMapper<DeckCardCollection, DeckCardData>, DeckCardMapper>()
                .AddScoped<IMapper<Game, GameData>, GameMapper>()
                .AddScoped<IMapper<GameDeck, GameDeckData>, GameDeckMapper>()
                .AddScoped<IMapper<GameDeckCardCollection, GameDeckCardCollectionData>, GameDeckCardCollectionMapper>()
                .AddScoped<IMapper<StoreItem, StoreItemData>, StoreItemMapper>()
                .AddScoped<IMapper<Turn, TurnData>, TurnMapper>()
                .AddScoped<IMapper<User, UserData>, UserMapper>()
            ;

            return services;
        }

        private static IServiceCollection AddCardHeroDataPostgreSqlRepositories(this IServiceCollection services)
        {
            services
                .AddScoped<ICardCollectionRepository, CardCollectionRepository>()
                .AddScoped<ICardPackRepository, CardPackRepository>()
                .AddScoped<ICardRepository, CardRepository>()
                .AddScoped<IDeckRepository, DeckRepository>()
                .AddScoped<IGameDeckCardCollectionRepository, GameDeckCardCollectionRepository>()
                .AddScoped<IGameDeckRepository, GameDeckRepository>()
                .AddScoped<IGameRepository, GameRepository>()
                .AddScoped<IMoveRepository, MoveRepository>()
                .AddScoped<IStoreItemRepository, StoreItemRepository>()
                .AddScoped<ITurnRepository, TurnRepository>()
                .AddScoped<IUserRepository, UserRepository>()
            ;

            return services;
        }
    }
}
