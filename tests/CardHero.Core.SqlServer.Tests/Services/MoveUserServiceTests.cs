using System;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.Services;

using Xunit;

namespace CardHero.Core.SqlServer.Tests
{
    public class MoveUserServiceTests
    {
        private readonly IMoveUserService _service;

        public MoveUserServiceTests()
        {
            _service = new MoveUserService();
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_NullMoves_ThrowsArgumentNullException()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.PopulateMoveUsersAsync(null, Enumerable.Empty<CardModel>(), Enumerable.Empty<int>(), default));
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_NullCards_ThrowsArgumentNullException()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.PopulateMoveUsersAsync(Enumerable.Empty<MoveModel>(), null, Enumerable.Empty<int>(), default));
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_NullUsers_ThrowsArgumentNullException()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _service.PopulateMoveUsersAsync(Enumerable.Empty<MoveModel>(), Enumerable.Empty<CardModel>(), null, default));
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_CardsNotMatchingMoves_ThrowsInvalidCardException()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row =  1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1
                }
            };

            var users = new int[]
            {
                1,
                2
            };

            await Assert.ThrowsAsync<InvalidCardException>(() => _service.PopulateMoveUsersAsync(moves, Enumerable.Empty<CardModel>(), users, default));
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_UsersNotMatchingMoves_ThrowsInvalidPlayerException()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row =  1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1
                }
            };

            var cards = new CardModel[]
            {
                new CardModel
                {
                    Id = 1,
                }
            };

            var users = new int[]
            {
            };

            await Assert.ThrowsAsync<InvalidPlayerException>(() => _service.PopulateMoveUsersAsync(moves, cards, users, default));
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_FirstMove_NothingChanges()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1,
                }
            };

            var cards = new CardModel[]
            {
                new CardModel
                {
                    Id = 1,
                }
            };

            var users = new int[]
            {
                1,
                2
            };

            var result = await _service.PopulateMoveUsersAsync(moves, cards, users, default);

            Assert.Single(result);
            Assert.Equal(1, result.First().UserId);
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_TwoMovesNoOverlap_NothingChanges()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1,
                },
                new MoveModel
                {
                    CardId = 1,
                    Column = 0,
                    Row = 0,
                    StartTime = DateTime.UtcNow.AddMinutes(-9),
                    UserId = 2,
                }
            };

            var cards = new CardModel[]
            {
                new CardModel
                {
                    Id = 1,
                }
            };

            var users = new int[]
            {
                1,
                2
            };

            var result = await _service.PopulateMoveUsersAsync(moves, cards, users, default);

            Assert.Equal(2, result.Count());
            Assert.Equal(1, result.First(x => x.Column == 1 && x.Row == 1).UserId);
            Assert.Equal(2, result.First(x => x.Column == 0 && x.Row == 0).UserId);
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_TwoMovesOverlapNoTake_NothingChanges()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1,
                },
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 0,
                    StartTime = DateTime.UtcNow.AddMinutes(-9),
                    UserId = 2,
                }
            };

            var cards = new CardModel[]
            {
                new CardModel
                {
                    Id = 1,
                }
            };

            var users = new int[]
            {
                1,
                2
            };

            var result = await _service.PopulateMoveUsersAsync(moves, cards, users, default);

            Assert.Equal(2, result.Count());
            Assert.Equal(1, result.First(x => x.Column == 1 && x.Row == 1).UserId);
            Assert.Equal(2, result.First(x => x.Column == 1 && x.Row == 0).UserId);
        }

        [Fact]
        public async Task PopulateMoveUsersAsync_TwoMovesOverlapWWithTake_Player2HasMoves()
        {
            var moves = new MoveModel[]
            {
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 1,
                    StartTime = DateTime.UtcNow.AddMinutes(-10),
                    UserId = 1,
                },
                new MoveModel
                {
                    CardId = 1,
                    Column = 1,
                    Row = 0,
                    StartTime = DateTime.UtcNow.AddMinutes(-9),
                    UserId = 2,
                }
            };

            var cards = new CardModel[]
            {
                new CardModel
                {
                    Id = 1,
                    UpAttack = 1,
                    DownAttack = 2,
                }
            };

            var users = new int[]
            {
                1,
                2
            };

            var result = await _service.PopulateMoveUsersAsync(moves, cards, users, default);

            Assert.Equal(2, result.Count());
            Assert.Equal(2, result.First(x => x.Column == 1 && x.Row == 1).UserId);
            Assert.Equal(2, result.First(x => x.Column == 1 && x.Row == 0).UserId);
        }
    }
}
