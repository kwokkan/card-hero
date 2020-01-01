using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroDataPostgreSql(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCardHeroDataPostgreSqlDbContext(configuration);

            services.AddCardHeroDataPostgreSqlMappers();

            services.AddCardHeroDataPostgreSqlRepositories();

            return services;
        }

        private static IServiceCollection AddCardHeroDataPostgreSqlDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CardHeroSqlServerConnection");
            var options = new CardHeroDataDbOptions
            {
                ConnectionString = connectionString,
            };

            services.AddScoped(x => options);

            services.AddDbContext<CardHeroDataDbContext>(x =>
            {
                x.UseNpgsql(options.ConnectionString);
            });

            return services;
        }

        private static IServiceCollection AddCardHeroDataPostgreSqlMappers(this IServiceCollection services)
        {
            services
                .AddScoped<IMapper<CardCollection, CardCollectionData>, CardCollectionMapper>()
                .AddScoped<IMapper<Card, CardData>, CardMapper>()
                .AddScoped<IMapper<Deck, DeckData>, DeckMapper>()
                .AddScoped<IMapper<DeckCardCollection, DeckCardData>, DeckCardMapper>()
                .AddScoped<IMapper<Game, GameData>, GameMapper>()
                .AddScoped<IMapper<GameDeck, GameDeckData>, GameDeckMapper>()
                .AddScoped<IMapper<GameDeckCardCollection, GameDeckCardCollectionData>, GameDeckCardCollectionMapper>()
                .AddScoped<IMapper<GameUser, GameUserData>, GameUserMapper>()
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
                .AddScoped<ICardRepository, CardRepository>()
                .AddScoped<IDeckRepository, DeckRepository>()
                .AddScoped<IGameDeckCardCollectionRepository, GameDeckCardCollectionRepository>()
                .AddScoped<IGameDeckRepository, GameDeckRepository>()
                .AddScoped<IGameRepository, GameRepository>()
                .AddScoped<IGameUserRepository, GameUserRepository>()
                .AddScoped<IMoveRepository, MoveRepository>()
                .AddScoped<IStoreItemRepository, StoreItemRepository>()
                .AddScoped<ITurnRepository, TurnRepository>()
                .AddScoped<IUserRepository, UserRepository>()
            ;

            return services;
        }
    }
}
