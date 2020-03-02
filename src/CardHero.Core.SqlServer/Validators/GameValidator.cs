using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;

namespace CardHero.Core.SqlServer
{
    internal class GameValidator : IGameValidator
    {
        private readonly IGameDataService _gameDataService;

        public GameValidator(IGameDataService gameDataService)
        {
            _gameDataService = gameDataService;
        }

        async Task<GameModel> IGameValidator.ValidateGameForMoveAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var games = await _gameDataService.GetGamesAsync(
                new GameSearchFilter
                {
                    GameId = id,
                },
                userId,
                cancellationToken: cancellationToken
            );
            var game = games.Results.FirstOrDefault();

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            var gameUser = game.Users.SingleOrDefault(x => x.Id == userId);

            if (gameUser == null)
            {
                throw new InvalidPlayerException();
            }

            if (!game.CurrentUserId.HasValue)
            {
                throw new InvalidMoveException($"Game { game.Id } has not started.");
            }

            if (game.CurrentUserId.Value != gameUser.Id)
            {
                throw new InvalidTurnException("It is not your turn.");
            }

            return game;
        }

        Task IGameValidator.ValidateNewGameAsync(GameCreateModel game, CancellationToken cancellationToken)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            if (game.Rows < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(game), nameof(game.Rows) + " must be >= 0.");
            }

            if (game.Columns < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(game), nameof(game.Columns) + " must be >= 0.");
            }

            if (!Enum.IsDefined(typeof(GameType), game.Type))
            {
                throw new ArgumentException(nameof(GameType) + " not valid.", nameof(game));
            }

            return Task.CompletedTask;
        }
    }
}
