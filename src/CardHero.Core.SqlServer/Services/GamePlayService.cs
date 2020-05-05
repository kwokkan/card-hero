using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Core.SqlServer.Handlers;
using CardHero.Core.SqlServer.Helpers;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class GamePlayService : BaseService, IGamePlayService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IMoveRepository _moveRepository;
        private readonly ITurnRepository _turnRepository;

        private readonly IGameDataService _gameDataService;
        private readonly IGameValidator _gameValidator;
        private readonly IMoveValidator _moveValidator;
        private readonly IGameDeckHelper _gameDeckHelper;
        private readonly IHandleWinnerHandler _handleWinnerHandler;

        public GamePlayService(
            IGameRepository gameRepository,
            IMoveRepository moveRepository,
            ITurnRepository turnRepository,
            IGameDataService gameDataService,
            IGameValidator gameValidator,
            IMoveValidator moveValidator,
            IGameDeckHelper gameDeckHelper,
            IHandleWinnerHandler handleWinnerHandler
        )
        {
            _gameRepository = gameRepository;
            _moveRepository = moveRepository;
            _turnRepository = turnRepository;

            _gameDataService = gameDataService;
            _gameValidator = gameValidator;
            _moveValidator = moveValidator;

            _gameDeckHelper = gameDeckHelper;

            _handleWinnerHandler = handleWinnerHandler;
        }

        private async Task<GameModel> ValidateMoveInternalAsync(MoveModel move, CancellationToken cancellationToken = default)
        {
            var game = await _gameValidator.ValidateGameForMoveAsync(move.GameId, move.UserId, cancellationToken: cancellationToken);

            await _moveValidator.ValidateMoveAsync(move, game, cancellationToken: cancellationToken);

            return game;
        }

        async Task<GamePlayModel> IGamePlayService.GetGamePlayByIdAsync(int id, int? userId, CancellationToken cancellationToken)
        {
            var filter = new Abstractions.GameSearchFilter
            {
                GameId = id,
            };
            var game = (await _gameDataService.GetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken)).Results.SingleOrDefault();

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            var gamePlay = new GamePlayModel
            {
                Game = game,
            };

            await _gameDeckHelper.PopulateDeckAsync(userId, game, gamePlay, cancellationToken: cancellationToken);

            return gamePlay;
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

            var gridSize = game.Columns * game.Rows;
            if (turns.Count == gridSize)
            {
                await _handleWinnerHandler.HandleAsync(game.Id, game.UserIds, cancellationToken: cancellationToken);
                return;
            }

            var nextUserId = game.UserIds
                .SkipWhile(x => x != move.UserId)
                .Skip(1)
                .FirstOrDefault();

            if (nextUserId == default)
            {
                nextUserId = game.UserIds.First();
            }

            var newTurn = new TurnData
            {
                CurrentUserId = nextUserId,
                GameId = game.Id,
                StartTime = DateTime.UtcNow,
            };

            await _turnRepository.AddTurnAsync(newTurn, cancellationToken: cancellationToken);

            var gameUpdate = new GameUpdateData
            {
                CurrentUserId = nextUserId,
            };
            await _gameRepository.UpdateGameAsync(game.Id, gameUpdate, cancellationToken: cancellationToken);
        }
    }
}
