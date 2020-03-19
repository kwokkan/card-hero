using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GamePlayApiControllerTests
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

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel { });

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }

        [Fact]
        public async Task MoveAsync_InvalidGame_ReturnsNotFound()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
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

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
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
                        Order = 1,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 2,
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
                        CurrentUserId = 1,
                        GameId = 701,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
                {
                    Column = 0,
                    GameDeckCardCollectionId = 1001,
                    Row = 2,
                });
                response.EnsureSuccessStatusCode();
                var model = await response.Content.ReadAsAsync<MoveModel>();

                Assert.Equal(0, model.Column);
                Assert.Equal(1001, model.GameDeckCardCollectionId);
                Assert.Equal(2, model.Row);
            });
        }

        [Fact]
        public async Task MoveAsync_TheirTurnYourMove_ReturnsBadRequest()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new GameData
                    {
                        Columns = 3,
                        CurrentUserId = 2,
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
                        Order = 2,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 1,
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
                        CurrentUserId = 2,
                        GameId = 701,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
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
                        Order = 2,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 1,
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
                        CurrentUserId = 2,
                        EndTime = DateTime.UtcNow.AddSeconds(-10),
                        GameId = 701,
                        Id = 1101,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
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
                        Order = 1,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 2,
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
                        CurrentUserId = 2,
                        EndTime = DateTime.UtcNow.AddMinutes(-5),
                        GameId = 701,
                        Id = 1101,
                        StartTime = DateTime.UtcNow.AddMinutes(-10),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        GameId = 701,
                        Id = 1102,
                        StartTime = DateTime.UtcNow.AddMinutes(-1),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
                {
                    Column = 1,
                    GameDeckCardCollectionId = 1001,
                    Row = 0,
                });
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync("api/play/701");
                var model = await response.Content.ReadAsAsync<GamePlayModel>();

                Assert.Equal(2, model.Moves.Count());
                Assert.Contains(model.Moves, x => x.Column == 1 && x.Row == 1 && x.GameDeckCardCollectionId == 1002);
                Assert.Contains(model.Moves, x => x.Column == 1 && x.Row == 0 && x.GameDeckCardCollectionId == 1001);
            });
        }

        [Fact]
        public async Task MoveAsync_LastMoveNoTakeDraw_ReturnsSuccess()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new CardData
                    {
                        DownAttack = 1,
                        Id = 101,
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
                        Order = 1,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 2,
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
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1002,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1003,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1004,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1005,
                    },

                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1011,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1012,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1013,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1014,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1015,
                    }
                );

                await factory.AddDataAsync(
                    new MoveData
                    {
                        Column = 0,
                        GameDeckCardCollectionId = 1001,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1101,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1011,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1102,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1002,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1103,
                    },

                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1012,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1104,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1003,
                        GameUserId = 801,
                        Row = 1,
                        TurnId = 1105,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1012,
                        GameUserId = 802,
                        Row = 2,
                        TurnId = 1106,
                    },

                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1004,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1107,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1014,
                        GameUserId = 802,
                        Row = 1,
                        TurnId = 1108,
                    }
                );

                var baseDate = DateTime.UtcNow.AddDays(-100);
                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(5),
                        GameId = 701,
                        Id = 1101,
                        StartTime = baseDate,
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(15),
                        GameId = 701,
                        Id = 1102,
                        StartTime = baseDate.AddDays(10),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(25),
                        GameId = 701,
                        Id = 1103,
                        StartTime = baseDate.AddDays(20),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(35),
                        GameId = 701,
                        Id = 1104,
                        StartTime = baseDate.AddDays(30),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(45),
                        GameId = 701,
                        Id = 1105,
                        StartTime = baseDate.AddDays(40),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(55),
                        GameId = 701,
                        Id = 1106,
                        StartTime = baseDate.AddDays(50),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(65),
                        GameId = 701,
                        Id = 1107,
                        StartTime = baseDate.AddDays(60),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(75),
                        GameId = 701,
                        Id = 1108,
                        StartTime = baseDate.AddDays(70),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        GameId = 701,
                        Id = 1109,
                        StartTime = baseDate.AddDays(80),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
                {
                    Column = 2,
                    GameDeckCardCollectionId = 1005,
                    Row = 2,
                });
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync("api/play/701");
                var model = await response.Content.ReadAsAsync<GamePlayModel>();

                Assert.NotNull(model.Game.EndTime);
                Assert.Null(model.Game.WinnerUserId);
            });
        }

        [Fact]
        public async Task MoveAsync_LastMoveTakeCornerWin_ReturnsSuccess()
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
                        DownAttack = 2,
                        Id = 102,
                        LeftAttack = 2,
                        RightAttack = 2,
                        UpAttack = 2,
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
                        Order = 1,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 2,
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
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1002,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1003,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1004,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 901,
                        Id = 1005,
                    },

                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1011,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1012,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1013,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1014,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 902,
                        Id = 1015,
                    }
                );

                await factory.AddDataAsync(
                    new MoveData
                    {
                        Column = 0,
                        GameDeckCardCollectionId = 1001,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1101,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1011,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1102,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1002,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1103,
                    },

                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1012,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1104,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1003,
                        GameUserId = 801,
                        Row = 1,
                        TurnId = 1105,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1012,
                        GameUserId = 802,
                        Row = 2,
                        TurnId = 1106,
                    },

                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1004,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1107,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1014,
                        GameUserId = 802,
                        Row = 1,
                        TurnId = 1108,
                    }
                );

                var baseDate = DateTime.UtcNow.AddDays(-100);
                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(5),
                        GameId = 701,
                        Id = 1101,
                        StartTime = baseDate,
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(15),
                        GameId = 701,
                        Id = 1102,
                        StartTime = baseDate.AddDays(10),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(25),
                        GameId = 701,
                        Id = 1103,
                        StartTime = baseDate.AddDays(20),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(35),
                        GameId = 701,
                        Id = 1104,
                        StartTime = baseDate.AddDays(30),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(45),
                        GameId = 701,
                        Id = 1105,
                        StartTime = baseDate.AddDays(40),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(55),
                        GameId = 701,
                        Id = 1106,
                        StartTime = baseDate.AddDays(50),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(65),
                        GameId = 701,
                        Id = 1107,
                        StartTime = baseDate.AddDays(60),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(75),
                        GameId = 701,
                        Id = 1108,
                        StartTime = baseDate.AddDays(70),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        GameId = 701,
                        Id = 1109,
                        StartTime = baseDate.AddDays(80),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
                {
                    Column = 2,
                    GameDeckCardCollectionId = 1005,
                    Row = 2,
                });
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync("api/play/701");
                var model = await response.Content.ReadAsAsync<GamePlayModel>();

                Assert.NotNull(model.Game.EndTime);
                Assert.Equal(1, model.Game.WinnerUserId);
            });
        }

        [Fact]
        public async Task MoveAsync_LastMoveOpponentWins_ReturnsSuccess()
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
                        DownAttack = 2,
                        Id = 102,
                        LeftAttack = 2,
                        RightAttack = 2,
                        UpAttack = 2,
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
                        Order = 1,
                        UserId = 1,
                    },
                    new GameUserData
                    {
                        GameId = 701,
                        Id = 802,
                        Order = 2,
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
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1002,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1003,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1004,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 101,
                        GameDeckId = 901,
                        Id = 1005,
                    },

                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1011,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1012,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1013,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1014,
                    },
                    new GameDeckCardCollectionData
                    {
                        CardId = 102,
                        GameDeckId = 902,
                        Id = 1015,
                    }
                );

                await factory.AddDataAsync(
                    new MoveData
                    {
                        Column = 0,
                        GameDeckCardCollectionId = 1001,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1101,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1011,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1102,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1002,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1103,
                    },

                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1012,
                        GameUserId = 802,
                        Row = 0,
                        TurnId = 1104,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1003,
                        GameUserId = 801,
                        Row = 1,
                        TurnId = 1105,
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1013,
                        GameUserId = 802,
                        Row = 2,
                        TurnId = 1106,
                    },

                    new MoveData
                    {
                        Column = 3,
                        GameDeckCardCollectionId = 1004,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1107,
                    },
                    new MoveData
                    {
                        Column = 2,
                        GameDeckCardCollectionId = 1014,
                        GameUserId = 802,
                        Row = 1,
                        TurnId = 1108,
                    }
                );

                var baseDate = DateTime.UtcNow.AddDays(-100);
                await factory.AddDataAsync(
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(5),
                        GameId = 701,
                        Id = 1101,
                        StartTime = baseDate,
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(15),
                        GameId = 701,
                        Id = 1102,
                        StartTime = baseDate.AddDays(10),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(25),
                        GameId = 701,
                        Id = 1103,
                        StartTime = baseDate.AddDays(20),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(35),
                        GameId = 701,
                        Id = 1104,
                        StartTime = baseDate.AddDays(30),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(45),
                        GameId = 701,
                        Id = 1105,
                        StartTime = baseDate.AddDays(40),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(55),
                        GameId = 701,
                        Id = 1106,
                        StartTime = baseDate.AddDays(50),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        EndTime = baseDate.AddDays(65),
                        GameId = 701,
                        Id = 1107,
                        StartTime = baseDate.AddDays(60),
                    },
                    new TurnData
                    {
                        CurrentUserId = 2,
                        EndTime = baseDate.AddDays(75),
                        GameId = 701,
                        Id = 1108,
                        StartTime = baseDate.AddDays(70),
                    },
                    new TurnData
                    {
                        CurrentUserId = 1,
                        GameId = 701,
                        Id = 1109,
                        StartTime = baseDate.AddDays(80),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/play/701/move", new MoveModel
                {
                    Column = 2,
                    GameDeckCardCollectionId = 1005,
                    Row = 2,
                });
                response.EnsureSuccessStatusCode();

                response = await client.GetAsync("api/play/701");
                var model = await response.Content.ReadAsAsync<GamePlayModel>();

                Assert.NotNull(model.Game.EndTime);
                Assert.Equal(2, model.Game.WinnerUserId);
            });
        }
    }
}
