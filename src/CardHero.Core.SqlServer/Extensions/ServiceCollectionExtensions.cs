using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Core.SqlServer.Services;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardHero.Core.SqlServer.Web
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCardHeroSqlServerDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CardHeroSqlServerConnection");

            services.Configure<CardHeroOptions>(options =>
            {
                options.ConnectionString = connectionString;
            });

            var newUserOptions = configuration.GetSection("Defaults:NewUser").Get<NewUserOptions>() ?? new NewUserOptions();
            services.AddSingleton(newUserOptions);

            // bug in RC2
            //services.AddDbContext<TripleTriadDbContext>(options =>
            //{
            //  options.UseSqlServer(connectionString);
            //});

            services
                .AddScoped<IDesignTimeDbContextFactory<CardHeroDbContext>, CardHeroDbContextFactory>()
                //.AddScoped(p => new TripleTriadDbContext(p.GetService<DbContextOptions<TripleTriadDbContext>>()))
                .AddScoped<ICardService, CardService>()
                .AddScoped<IDeckService, DeckService>()
                .AddScoped<IGamePlayService, GamePlayService>()
                .AddScoped<IGameService, GameService>()
                .AddScoped<IMoveService, MoveService>()
                .AddScoped<IStoreItemService, StoreItemService>()
                .AddScoped<ITurnService, TurnService>()
                .AddScoped<IUserService, UserService>()
            ;

            services
                .AddScoped<IGameValidator, GameValidator>()
            ;

            services
                .AddScoped<IDataMapper<GameData, GameModel>, GameDataMapper>()
                .AddScoped<IDataMapper<GameCreateData, GameCreateModel>, GameCreateDataMapper>()
                .AddScoped<IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel>, GameDeckCardCollectionMapper>()
                .AddScoped<IDataMapper<GameDeckData, GameDeckModel>, GameDeckDataMapper>()
                .AddScoped<IDataMapper<GameUserData, GameUserModel>, GameUserDataMapper>()
                .AddScoped<IDataMapper<MoveData, MoveModel>, MoveDataMapper>()
            ;

            return services;
        }
    }
}
