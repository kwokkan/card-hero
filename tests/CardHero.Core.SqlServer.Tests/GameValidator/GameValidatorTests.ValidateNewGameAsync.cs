using System;
using System.Threading.Tasks;

using CardHero.Core.Models;

using Xunit;

namespace CardHero.Core.SqlServer.Tests
{
    public partial class GameValidatorTests: GameValidatorTestsBase
    {
        public GameValidatorTests()
            :base()
        {
        }

        [Fact]
        public async Task ValidateNewGameAsync_ZeroColumnsAsync()
        {
            var model = new GameCreateModel
            {
                Columns = 0,
                Rows = 3,
                Type = GameType.TripleTriad,
            };

            await _gameValidator.ValidateNewGameAsync(model);
        }

        [Fact]
        public async Task ValidateNewGameAsync_NegativeColumnsAsync()
        {
            var model = new GameCreateModel
            {
                Columns = -1,
                Rows = 3,
                Type = GameType.TripleTriad,
            };

            await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _gameValidator.ValidateNewGameAsync(model));
        }
    }
}
