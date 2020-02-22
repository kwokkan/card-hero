using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class SqlServerWebApplicationFactory : BaseWebApplicationFactory
    {
        private CardHeroDataDbContext _context = null;

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

            foreach (var item in context.CardPack)
            {
                context.CardPack.Remove(item);
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

            foreach (var item in context.Game)
            {
                context.Game.Remove(item);
            }

            foreach (var item in context.GameDeck)
            {
                context.GameDeck.Remove(item);
            }

            foreach (var item in context.GameUser)
            {
                context.GameUser.Remove(item);
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
                CardPackFk = 600,
                CardPk = 1,
                Name = "First card",
                RarityFk = 1,
            });
            context.Card.Add(new Card
            {
                CardPackFk = 601,
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

            context.CardPack.Add(new CardPack
            {
                CardPackPk = 600,
                Name = "First pack",
            });
            context.CardPack.Add(new CardPack
            {
                CardPackPk = 601,
                Name = "Second pack",
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
                CardPackFk = 601,
                Cost = 100,
                ItemCount = 1,
                Name = "Valid Bundle",
                StoreItemPk = 501,
            });
            context.StoreItem.Add(new StoreItem
            {
                Cost = 200,
                Expiry = DateTime.UtcNow.AddYears(-1),
                ItemCount = 2,
                Name = "Expired Bundle",
                StoreItemPk = 502,
            });
            context.StoreItem.Add(new StoreItem
            {
                Cost = 300,
                Expiry = DateTime.UtcNow.AddDays(7),
                ItemCount = 3,
                Name = "Still Valid Bundle",
                StoreItemPk = 503,
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

        private static void ResetDataInternal(CardHeroDataDbContext context)
        {
            ClearDbContext(context);

            SeedStaticData(context);

            SeedDbContext(context);
        }

        public override async Task AddDataAsync(params GameData[] data)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                foreach (var d in data)
                {
                    context.Game.Add(new Game
                    {
                        Columns = d.Columns,
                        CurrentGameUserFk = d.CurrentGameUserId,
                        GamePk = d.Id,
                        MaxPlayers = d.MaxPlayers,
                        Rows = d.Rows,
                        WinnerFk = d.WinnerId,
                    });
                }

                await context.SaveChangesAsync();
            }
        }

        public override async Task AddDataAsync(params GameDeckCardCollectionData[] data)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                foreach (var d in data)
                {
                    context.GameDeckCardCollection.Add(new GameDeckCardCollection
                    {
                        CardFk = d.CardId,
                        GameDeckCardCollectionPk = d.Id,
                        GameDeckFk = d.GameDeckId,
                    });
                }

                await context.SaveChangesAsync();
            }
        }

        public override async Task AddDataAsync(params GameDeckData[] data)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                foreach (var d in data)
                {
                    context.GameDeck.Add(new GameDeck
                    {
                        GameDeckPk = d.Id,
                        GameUserFk = d.GameUserId,
                        Name = d.Name,
                    });
                }

                await context.SaveChangesAsync();
            }
        }

        public override async Task AddDataAsync(params GameUserData[] data)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                foreach (var d in data)
                {
                    context.GameUser.Add(new GameUser
                    {
                        GameFk = d.GameId,
                        GameUserPk = d.Id,
                        UserFk = d.UserId,
                    });
                }

                await context.SaveChangesAsync();
            }
        }

        public override async Task AddDataAsync(params TurnData[] data)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                foreach (var d in data)
                {
                    context.Turn.Add(new Turn
                    {
                        CurrentGameUserFk = d.CurrentGameUserId,
                        EndTime = d.EndTime,
                        GameFk = d.GameId,
                        StartTime = d.StartTime,
                        TurnPk = d.Id,
                    });
                }

                await context.SaveChangesAsync();
            }
        }

        public override async Task ResetDataAsync()
        {
            using (var scope = Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                ResetDataInternal(context);

                await context.SaveChangesAsync();
            }
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
                        context.UseInMemoryDatabase("CardHeroDataSqlServerMemoryDbContext/" + Id);
                    });

                    if (_context == null)
                    {
                        var serviceProvider = services.BuildServiceProvider();

                        using (var scope = serviceProvider.CreateScope())
                        {
                            var scopedServices = scope.ServiceProvider;
                            var context = scopedServices.GetRequiredService<CardHeroDataDbContext>();

                            context.Database.EnsureCreated();

                            ResetDataInternal(context);

                            _context = context;
                        }
                    }
                })
                .ConfigureAppConfiguration((context, builder) =>
                {
                    builder.AddJsonFile("appsettings.SqlServer.json");
                })
            ;
        }
    }
}
