using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroDataSqlServer(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CardHeroSqlServerConnection");

            if (!string.IsNullOrWhiteSpace(connectionString))
            {
                services.AddCardHeroDataSqlServerDbContext(connectionString);

                services.AddCardHeroDataSqlServerMappers();

                services.AddCardHeroDataSqlServerRepositories();
            }

            return services;
        }

        private static IServiceCollection AddCardHeroDataSqlServerDbContext(this IServiceCollection services, string connectionString)
        {
            var options = new CardHeroDataDbOptions
            {
                ConnectionString = connectionString,
            };

            services.AddScoped(x => options);

            services.AddDbContext<CardHeroDataDbContext>(x =>
            {
                x.UseSqlServer(options.ConnectionString);
            });

            return services;
        }

        private static IServiceCollection AddCardHeroDataSqlServerMappers(this IServiceCollection services)
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

        private static IServiceCollection AddCardHeroDataSqlServerRepositories(this IServiceCollection services)
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
