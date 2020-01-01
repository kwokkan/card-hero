using System;
using System.IO;
using System.Linq;

using CardHero.Data.PostgreSql.EntityFramework;

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
            foreach (var item in context.Card)
            {
                context.Card.Remove(item);
            }

            foreach (var item in context.CardCollection)
            {
                context.CardCollection.Remove(item);
            }

            foreach (var item in context.CardFavourite)
            {
                context.CardFavourite.Remove(item);
            }

            foreach (var item in context.Deck)
            {
                context.Deck.Remove(item);
            }

            foreach (var item in context.DeckCardCollection)
            {
                context.DeckCardCollection.Remove(item);
            }

            foreach (var item in context.DeckFavourite)
            {
                context.DeckFavourite.Remove(item);
            }

            foreach (var item in context.Rarity)
            {
                context.Rarity.Remove(item);
            }

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

        private static void SeedStaticData(CardHeroDataDbContext context)
        {
            context.Rarity.AddRange(
                new Rarity
                {
                    Frequency = 10,
                    RarityPk = 1,
                    Name = "Common",
                },
                new Rarity
                {
                    Frequency = 5,
                    RarityPk = 2,
                    Name = "Uncommon",
                },
                new Rarity
                {
                    Frequency = 3,
                    RarityPk = 3,
                    Name = "Rare",
                }
            );
        }

        private static void SeedDbContext(CardHeroDataDbContext context)
        {
            context.Card.Add(new Card
            {
                CardPk = 1,
                Name = "First card",
                RarityFk = 1,
            });
            context.Card.Add(new Card
            {
                CardPk = 2,
                Name = "Second card",
                RarityFk = 2,
            });

            context.CardCollection.Add(new CardCollection
            {
                CardCollectionPk = 1,
                CardFk = 1,
                UserFk = 1,
            });
            context.CardCollection.Add(new CardCollection
            {
                CardCollectionPk = 2,
                CardFk = 2,
                UserFk = 1,
            });
            context.CardCollection.Add(new CardCollection
            {
                CardCollectionPk = 3,
                CardFk = 1,
                UserFk = 2,
            });

            context.Deck.Add(new Deck
            {
                DeckPk = 1,
                MaxCards = 5,
                Name = "First deck",
                UserFk = 1,
            });
            context.Deck.Add(new Deck
            {
                DeckPk = 2,
                MaxCards = 5,
                Name = "Second deck",
                UserFk = 1,
            });
            context.Deck.Add(new Deck
            {
                DeckPk = 3,
                MaxCards = 5,
                Name = "Third deck",
                UserFk = 2
            });

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
            context.User.Add(new User
            {
                Coins = 0,
                FullName = "Inactive user",
                Identifier = "_",
                IdPsource = "TestSvr",
                UserPk = 2
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
                    var existingContext = services.SingleOrDefault(x => x.ServiceType == typeof(DbContextOptions<CardHeroDataDbContext>));

                    if (existingContext != null)
                    {
                        services.Remove(existingContext);
                    }

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

                        SeedStaticData(context);

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
