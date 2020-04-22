using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GameApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory>, IClassFixture<SqlServerWebApplicationFactory>
    {
        [Fact]
        public async Task PostAsync_Unauthorized()
        {
            await RunAsync(async factory =>
            {
                var game = new GameCreateModel
                {
                    DeckId = 401,
                    Type = GameType.Standard,
                };
                var client = factory.CreateClient();

                var response = await client.PostJsonAsync("api/games", game);

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }

        [Fact]
        public async Task PostAsync_DeckNotEnoughCards_ReturnsBadRequest()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new CardData
                    {
                        Id = IdCard + 1,
                    }
                );

                await factory.AddDataAsync(
                    new DeckData
                    {
                        Id = 401,
                        MaxCards = 5,
                        UserId = 1,
                        Cards = new DeckCardData[]
                        {
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 1,
                                CardId = IdCard + 1,
                            },
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 2,
                                CardId = IdCard + 1,
                            },
                        }
                    }
                );

                var game = new GameCreateModel
                {
                    DeckId = 401,
                    Type = GameType.Standard,
                };
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games", game);
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal($"Deck 401 needs 5 cards. Currently only has 2.", model.Message);
            });
        }

        [Fact]
        public async Task PostAsync_ValidDeck_ReturnsSuccess()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new CardData
                    {
                        Id = IdCard + 1,
                    }
                );

                await factory.AddDataAsync(
                    new DeckData
                    {
                        Id = 401,
                        MaxCards = 5,
                        UserId = 1,
                        Cards = new DeckCardData[]
                        {
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 1,
                                CardId = IdCard + 1,
                            },
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 2,
                                CardId = IdCard + 1,
                            },
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 3,
                                CardId = IdCard + 1,
                            },
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 4,
                                CardId = IdCard + 1,
                            },
                            new DeckCardData
                            {
                                CardCollectionId = IdCardCollection + 5,
                                CardId = IdCard + 1,
                            },
                        }
                    }
                );

                var game = new GameCreateModel
                {
                    DeckId = 401,
                    Type = GameType.Standard,
                };
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games", game);
                response.EnsureSuccessStatusCode();

                var model = await response.Content.ReadAsAsync<GameModel>();

                Assert.NotNull(model);
                Assert.True(model.Id > 0);
                Assert.Null(model.WinnerUserId);
            });
        }
    }
}
