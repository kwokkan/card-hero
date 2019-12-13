using System;
using System.IO;
using System.Linq;

using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup>
        where TStartup : class
    {
        private static void ClearDbContext(CardHeroDataDbContext context)
        {
            foreach (var item in context.StoreItem)
            {
                context.StoreItem.Remove(item);
            }

            foreach (var item in context.User)
            {
                context.User.Remove(item);
            }

            context.SaveChanges();
        }

        private static void SeedDbContext(CardHeroDataDbContext context)
        {
            context.StoreItem.Add(new StoreItem
            {
                Cost = 100,
                ItemCount = 1,
                Name = "Valid Bundle",
                StoreItemPk = 1
            });
            context.StoreItem.Add(new StoreItem
            {
                Cost = 200,
                Expiry = DateTime.UtcNow.AddYears(-1),
                ItemCount = 2,
                Name = "Expired Bundle",
                StoreItemPk = 2
            });
            context.StoreItem.Add(new StoreItem
            {
                Cost = 300,
                Expiry = DateTime.UtcNow.AddDays(7),
                ItemCount = 3,
                Name = "Still Valid Bundle",
                StoreItemPk = 3
            });

            context.User.Add(new User
            {
                Coins = 123456,
                FullName = "Test user",
                Identifier = "abcxyz",
                IdPsource = "TestSvr",
                UserPk = 1
            });

            context.SaveChanges();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);

            builder
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureServices(services =>
                {
                    var existingDataDbContextFactory = services.SingleOrDefault(x => x.ServiceType == typeof(ICardHeroDataDbContextFactory));

                    if (existingDataDbContextFactory != null)
                    {
                        services.Remove(existingDataDbContextFactory);
                    }

                    services.AddScoped<ICardHeroDataDbContextFactory, TestCardHeroDataDbContextFactory>();

                    services.AddDbContext<CardHeroDataDbContext>((context) =>
                    {
                        context.UseInMemoryDatabase("CardHeroDataMemoryDbContext");
                    });

                    var serviceProvider = services.BuildServiceProvider();

                    using (var scope = serviceProvider.CreateScope())
                    {
                        var scopedServices = scope.ServiceProvider;
                        var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                        context.Database.EnsureCreated();

                        ClearDbContext(context);

                        SeedDbContext(context);
                    }
                })
                .ConfigureAppConfiguration((context, builder) =>
                {
                    builder.AddJsonFile("appsettings.Development.json");
                })
            ;
        }
    }
}
