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
        public async Task JoinAsync_Unauthorized()
        {
            await RunAsync(async factory =>
            {
                var game = new GameJoinModel
                {
                    DeckId = IdDeck + 1,
                };
                var client = factory.CreateClient();

                var response = await client.PostJsonAsync($"api/games/{ IdGame + 1 }/join", game);

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }
        [Fact]
        public async Task JoinAsync_InvalidGame_ReturnsNotFound()
        {
            await RunAsync(async factory =>
            {
                var game = new GameJoinModel
                {
                    DeckId = IdDeck + 1,
                };
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync($"api/games/{ IdGame + 1 }/join", game);
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                //TODO: Replace with NotFound
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal($"Game { IdGame + 1 } does not exist.", model.Message);
            });
        }

        [Fact]
        public async Task JoinAsync_DeckNotEnoughCards_ReturnsBadRequest()
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
                        Id = IdDeck + 1,
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

                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        Id = IdGame + 1,
                        MaxPlayers = 2,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = IdGame + 1,
                        UserId = 2,
                    }
                );

                var game = new GameJoinModel
                {
                    DeckId = IdDeck + 1,
                };
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync($"api/games/{ IdGame + 1 }/join", game);
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal($"Deck { IdDeck + 1 } needs 5 cards. Currently only has 2.", model.Message);
            });
        }

        [Fact]
        public async Task JoinAsync_ValidDeckGameStarts_ReturnsSuccess()
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
                        Id = IdDeck + 1,
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

                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        Id = IdGame + 1,
                        MaxPlayers = 2,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = IdGame + 1,
                        UserId = 2,
                    }
                );

                var game = new GameJoinModel
                {
                    DeckId = IdDeck + 1,
                };
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync($"api/games/{ IdGame + 1 }/join", game);
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync($"api/games/{ IdGame + 1 }");
                var model = await response.Content.ReadAsAsync<GameModel>();

                Assert.NotNull(model);
                Assert.NotNull(model.CurrentUserId);
            });
        }
    }
}
