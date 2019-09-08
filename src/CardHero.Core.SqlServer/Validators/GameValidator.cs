using System;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer
{
    internal class GameValidator : IGameValidator
    {
        public Task ValidateGameAsync(GameModel game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            if (game.Rows < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(game.Rows), nameof(game.Rows) + " must be >= 0.");
            }

            if (game.Columns < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(game.Columns), nameof(game.Columns) + " must be >= 0.");
            }

            if (!Enum.IsDefined(typeof(GameType), game.Type))
            {
                throw new ArgumentException(nameof(GameType) + " not valid.", nameof(game.Type));
            }

            return Task.CompletedTask;
        }
    }
}
