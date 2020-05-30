using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GamePlayApiControllerTests
    {
        [Fact]
        public async Task GetByIdAsync_NoCardsTaken_ReturnsSuccess()
        {
            await RunAsync(async factory =>
            {
                await factory.AddDataAsync(
                    new CardModel
                    {
                        DownAttack = 1,
                        Id = 101,
                        Rarity = new RarityModel
                        {
                            Id = Rarity.Common,
                        },
                        UpAttack = 1,
                    },
                    new CardModel
                    {
                        DownAttack = 1,
                        Id = 102,
                        Rarity = new RarityModel
                        {
                            Id = Rarity.Common,
                        },
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
                    },
                    new MoveData
                    {
                        Column = 1,
                        GameDeckCardCollectionId = 1001,
                        GameUserId = 801,
                        Row = 0,
                        TurnId = 1102,
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
                        EndTime = DateTime.UtcNow.AddMinutes(-2),
                        GameId = 701,
                        Id = 1102,
                        StartTime = DateTime.UtcNow.AddMinutes(-3),
                    }
                );

                var client = factory.CreateClientWithAuth();

                var response = await client.GetAsync("api/play/701");
                response.EnsureSuccessStatusCode();

                var model = await response.Content.ReadAsAsync<GamePlayModel>();

                Assert.Equal(2, model.Moves.Count());
                Assert.Contains(model.Moves, x => x.Column == 1 && x.Row == 1 && x.GameDeckCardCollectionId == 1002 && x.UserId == 2);
                Assert.Contains(model.Moves, x => x.Column == 1 && x.Row == 0 && x.GameDeckCardCollectionId == 1001 && x.UserId == 1);
            });
        }
    }
}
