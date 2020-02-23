using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class GamePlayService : BaseService, IGamePlayService
    {
        private readonly IGameDeckCardCollectionRepository _gameDeckCardCollectionRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IMoveRepository _moveRepository;
        private readonly ITurnRepository _turnRepository;

        private readonly IGameValidator _gameValidator;
        private readonly IMoveValidator _moveValidator;

        public GamePlayService(
            IGameDeckCardCollectionRepository gameDeckCardCollectionRepository,
            IGameRepository gameRepository,
            IMoveRepository moveRepository,
            ITurnRepository turnRepository,
            IGameValidator gameValidator,
            IMoveValidator moveValidator
        )
        {
            _gameDeckCardCollectionRepository = gameDeckCardCollectionRepository;
            _gameRepository = gameRepository;
            _moveRepository = moveRepository;
            _turnRepository = turnRepository;

            _gameValidator = gameValidator;
            _moveValidator = moveValidator;
        }

        private async Task<GameModel> ValidateMoveInternalAsync(MoveModel move, CancellationToken cancellationToken = default)
        {
            var game = await _gameValidator.ValidateGameForMoveAsync(move.GameId, move.UserId, cancellationToken: cancellationToken);

            var card = (await _gameDeckCardCollectionRepository.SearchAsync(
                new GameDeckCardCollectionSearchFilter
                {
                    Ids = new int[] { move.GameDeckCardCollectionId },
                    UserId = move.UserId,
                }, cancellationToken: cancellationToken)).SingleOrDefault(x => x.Id == move.GameDeckCardCollectionId);

            if (card == null)
            {
                throw new InvalidCardException();
            }

            await _moveValidator.ValidateMoveAsync(move, game, cancellationToken: cancellationToken);

            return game;
        }

        async Task IGamePlayService.MakeMoveAsync(MoveModel move, CancellationToken cancellationToken)
        {
            var game = await ValidateMoveInternalAsync(move, cancellationToken: cancellationToken);

            var turns = await _turnRepository.GetTurnsByGameIdAsync(game.Id, cancellationToken: cancellationToken);

            var currentTurn = turns
                .Where(x => !x.EndTime.HasValue)
                .OrderByDescending(x => x.StartTime)
                .FirstOrDefault();

            var turnUpdate = new TurnUpdateData
            {
                EndTime = DateTime.UtcNow,
            };

            await _turnRepository.UpdateTurnAsync(currentTurn.Id, turnUpdate, cancellationToken: cancellationToken);

            var currentMove = new MoveData
            {
                GameDeckCardCollectionId = move.GameDeckCardCollectionId,
                Column = move.Column,
                Row = move.Row,
                TurnId = currentTurn.Id,
            };

            await _moveRepository.AddMoveAsync(currentMove, cancellationToken: cancellationToken);

            var nextUser = game.Users
                .SkipWhile(x => x.UserId != move.UserId)
                .Skip(1)
                .FirstOrDefault();

            if (nextUser == null)
            {
                nextUser = game.Users.First();
            }

            var newTurn = new TurnData
            {
                CurrentGameUserId = nextUser.Id,
                GameId = game.Id,
                StartTime = DateTime.UtcNow,
            };

            await _turnRepository.AddTurnAsync(newTurn, cancellationToken: cancellationToken);

            var gameUpdate = new GameUpdateData
            {
                CurrentGameUserId = nextUser.Id,
            };
            await _gameRepository.UpdateGameAsync(game.Id, gameUpdate, cancellationToken: cancellationToken);
        }
    }
}
