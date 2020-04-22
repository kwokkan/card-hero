using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Core.SqlServer.Services;
using CardHero.Data.Abstractions;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardHero.Core.SqlServer.Web
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroSqlServerDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var newUserOptions = configuration.GetSection("Defaults:NewUser").Get<NewUserOptions>() ?? new NewUserOptions();
            services.AddSingleton(newUserOptions);

            services
                .AddScoped<ICardCollectionService, CardCollectionService>()
                .AddScoped<ICardPackService, CardPackService>()
                .AddScoped<ICardService, CardService>()
                .AddScoped<IDeckService, DeckService>()
                .AddScoped<IGamePlayService, GamePlayService>()
                .AddScoped<IGameService, GameService>()
                .AddScoped<IMoveService, MoveService>()
                .AddScoped<IMoveUserService, MoveUserService>()
                .AddScoped<IStoreItemService, StoreItemService>()
                .AddScoped<IUserService, UserService>()
            ;

            services
                .AddScoped<IGameDataService, GameDataService>()
            ;

            services
                .AddScoped<IGameValidator, GameValidator>()
                .AddScoped<IMoveValidator, MoveValidator>()
            ;

            services
                .AddScoped<IDataMapper<CardCollectionData, CardCollectionModel>, CardCollectionDataMapper>()
                .AddScoped<IDataMapper<CardData, CardModel>, CardDataMapper>()
                .AddScoped<IDataMapper<CardPackData, CardPackModel>, CardPackDataMapper>()
                .AddScoped<IDataMapper<DeckData, DeckModel>, DeckDataMapper>()
                .AddScoped<IDataMapper<GameData, GameModel>, GameDataMapper>()
                .AddScoped<IDataMapper<GameCreateData, GameCreateModel>, GameCreateDataMapper>()
                .AddScoped<IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel>, GameDeckCardCollectionMapper>()
                .AddScoped<IDataMapper<GameDeckData, GameDeckModel>, GameDeckDataMapper>()
                .AddScoped<IDataMapper<MoveData, MoveModel>, MoveDataMapper>()
                .AddScoped<IDataMapper<StoreItemData, StoreItemModel>, StoreItemDataMapper>()
                .AddScoped<IDataMapper<UserData, UserModel>, UserDataMapper>()
            ;

            return services;
        }
    }
}
