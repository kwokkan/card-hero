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
        private readonly IGameDataService _gameService;

        public GameValidator(IGameDataService gameService)
        {
            _gameService = gameService;
        }

        async Task<GameModel> IGameValidator.ValidateGameForMoveAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var games = await _gameService.GetGamesAsync(
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

            var gameUser = game.Users.SingleOrDefault(x => x.UserId == userId);

            if (gameUser == null)
            {
                throw new InvalidPlayerException();
            }

            if (!game.CurrentGameUserId.HasValue)
            {
                throw new InvalidMoveException($"Game { game.Id } has not started.");
            }

            if (game.CurrentUser.Id != gameUser.Id)
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
