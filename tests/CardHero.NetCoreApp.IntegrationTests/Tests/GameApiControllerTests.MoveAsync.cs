using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GameApiControllerTests
    {
        [Fact]
        public async Task MoveAsync_Unauthorized_ReturnsUnauthorized()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                var client = factory.CreateClient();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel { });

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }

        [Fact]
        public async Task MoveAsync_InvalidGame_ReturnsNotFound()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 1,
                    GameDeckCardCollectionId = 1,
                    Row = 1,
                });
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                //TODO: Replace with NotFound
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("Game 701 does not exist.", model.Message);
            });
        }

        [Fact]
        public async Task MoveAsync_GameNotStarted_ReturnsBadRequest()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 801,
                        UserId = 1,
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckData
                    {
                        GameUserId = 801,
                        Id = 901,
                        Name = "First deck",
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 1,
                    GameDeckCardCollectionId = 1,
                    Row = 1,
                });
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("Game 701 has not started.", model.Message);
            });
        }

        [Fact]
        public async Task MoveAsync_YourTurnFirstMove_ReturnsSuccess()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        CurrentUserId = 1,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 801,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        UserId = 2,
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckData
                    {
                        GameUserId = 801,
                        Id = 901,
                        Name = "First deck",
                    },
                    new GameDeckData
                    {
                        GameUserId = 802,
                        Id = 902,
                        Name = "Second deck",
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckCardCollectionData
                    {
                        CardId = 600,
                        GameDeckId = 901,
                        Id = 1001,
                    }
                );

                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentGameUserId = 801,
                        GameId = 701,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 0,
                    GameDeckCardCollectionId = 1001,
                    Row = 2,
                });
                response.EnsureSuccessStatusCode();
                var model = await response.Content.ReadAsAsync<GameMoveViewModel>();

                Assert.Equal(0, model.Column);
                Assert.Equal(1001, model.GameDeckCardCollectionId);
                Assert.Equal(2, model.Row);
            });
        }

        [Fact]
        public async Task MoveAsync_TheirTurnYouMove_ReturnsBadRequest()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        CurrentUserId = 1,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 801,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        UserId = 2,
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckData
                    {
                        GameUserId = 801,
                        Id = 901,
                        Name = "First deck",
                    },
                    new GameDeckData
                    {
                        GameUserId = 802,
                        Id = 902,
                        Name = "Second deck",
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckCardCollectionData
                    {
                        CardId = 600,
                        GameDeckId = 901,
                        Id = 1001,
                    }
                );

                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentGameUserId = 801,
                        GameId = 701,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 0,
                    GameDeckCardCollectionId = 1001,
                    Row = 2,
                });
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("It is not your turn.", model.Message);
            });
        }

        [Fact]
        public async Task MoveAsync_YourTurnExistingCell_ReturnsBadRequest()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        CurrentUserId = 1,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 801,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        UserId = 2,
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckData
                    {
                        GameUserId = 801,
                        Id = 901,
                        Name = "First deck",
                    },
                    new GameDeckData
                    {
                        GameUserId = 802,
                        Id = 902,
                        Name = "Second deck",
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckCardCollectionData
                    {
                        CardId = 600,
                        GameDeckId = 901,
                        Id = 1001,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 600,
                        GameDeckId = 902,
                        Id = 1002,
                    }
                );

                await factory.AddDataAsync(
                    new MoveData
                    {
                        Column = 0,
                        GameDeckCardCollectionId = 1002,
                        GameUserId = 802,
                        Row = 2,
                        TurnId = 1101,
                    }
                );

                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentGameUserId = 802,
                        EndTime = DateTime.UtcNow.AddSeconds(-10),
                        GameId = 701,
                        Id = 1101,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 0,
                    GameDeckCardCollectionId = 1001,
                    Row = 2,
                });
                var model = await response.Content.ReadAsAsync<ErrorViewModel>();

                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                Assert.Equal("There is already a card in this location.", model.Message);
            });
        }

        [Fact]
        public async Task MoveAsync_YourTurnCellAboveNoTake_ReturnsSuccess()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new CardData
                    {
                        DownAttack = 1,
                        Id = 101,
                        UpAttack = 1,
                    },
                    new CardData
                    {
                        DownAttack = 1,
                        Id = 102,
                        UpAttack = 1,
                    }
                );

                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        CurrentUserId = 1,
                        MaxPlayers = 2,
                        Id = 701,
                        Rows = 3,
                    }
                );

                await factory.AddDataAsync(
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 801,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        UserId = 2,
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckData
                    {
                        GameUserId = 801,
                        Id = 901,
                        Name = "First deck",
                    },
                    new GameDeckData
                    {
                        GameUserId = 802,
                        Id = 902,
                        Name = "Second deck",
                    }
                );

                await factory.AddDataAsync(
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1001,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1002,
                    }
                );

                await factory.AddDataAsync(
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1002,
                        GameUserId = 802,
                        Row = 1,
                        TurnId = 1101,
                    }
                );

                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentGameUserId = 802,
                        EndTime = DateTime.UtcNow.AddMinutes(-5),
                        GameId = 701,
                        Id = 1101,
                        StartTime = DateTime.UtcNow.AddMinutes(-10),
                    },
                    new TurnData
                    {
                        CurrentGameUserId = 801,
                        GameId = 701,
                        Id = 1102,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/games/701/move", new GameMoveViewModel
                {
                    Column = 1,
                    GameDeckCardCollectionId = 1001,
                    Row = 0,
                });
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync("api/games/701");
                var model = await response.Content.ReadAsAsync<GameViewModel>();

                Assert.Equal(2, model.Data.Moves.Count());
                Assert.Contains(model.Data.Moves, x => x.Column == 1 && x.Row == 1 && x.GameDeckCardCollectionId == 1002);
                Assert.Contains(model.Data.Moves, x => x.Column == 1 && x.Row == 0 && x.GameDeckCardCollectionId == 1001);
            });
        }
    }
}
