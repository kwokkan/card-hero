using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Core.SqlServer.Helpers;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class GamePlayService : BaseService, IGamePlayService
    {
        private readonly IGameRepository _gameRepository;
        private readonly IMoveRepository _moveRepository;
        private readonly ITurnRepository _turnRepository;

        private readonly ICardService _cardService;
        private readonly IGameDataService _gameDataService;
        private readonly IMoveService _moveService;
        private readonly IMoveUserService _moveUserService;
        private readonly IGameValidator _gameValidator;
        private readonly IMoveValidator _moveValidator;
        private readonly IGameDeckHelper _gameDeckHelper;

        public GamePlayService(
            IGameRepository gameRepository,
            IMoveRepository moveRepository,
            ITurnRepository turnRepository,
            ICardService cardService,
            IGameDataService gameDataService,
            IMoveService moveService,
            IMoveUserService moveUserService,
            IGameValidator gameValidator,
            IMoveValidator moveValidator,
            IGameDeckHelper gameDeckHelper
        )
        {
            _gameRepository = gameRepository;
            _moveRepository = moveRepository;
            _turnRepository = turnRepository;

            _cardService = cardService;
            _gameDataService = gameDataService;
            _moveService = moveService;
            _moveUserService = moveUserService;
            _gameValidator = gameValidator;
            _moveValidator = moveValidator;
            _gameDeckHelper = gameDeckHelper;
        }

        private async Task HandleWinnerAsync(int gameId, IEnumerable<int> userIds, CancellationToken cancellationToken = default)
        {
            var moves = await _moveService.GetMovesAsync(gameId, cancellationToken: cancellationToken);

            var cardIds = moves.Select(x => x.CardId).ToArray();
            var result = await _cardService.GetCardsAsync(new Abstractions.CardSearchFilter
            {
                Ids = cardIds,
            });
            var cards = result.Results;

            var newMoves = await _moveUserService.PopulateMoveUsersAsync(moves, cards, userIds, cancellationToken: cancellationToken);

            var groupedMoves = newMoves
                .GroupBy(x => x.UserId)
                .Select(x =>
                new
                {
                    UserId = x.Key,
                    Count = x.Count() - (x.Key == userIds.First() ? 1 : 0),
                })
                .OrderByDescending(x => x.Count)
                .ToArray()
            ;

            var highestValue = groupedMoves[0].Count;

            var gameUpdate = new GameUpdateData
            {
                EndTime = DateTime.UtcNow,
            };

            if (groupedMoves.Skip(1).Any(x => x.Count == highestValue))
            {
                // draw
            }
            else if (groupedMoves.Skip(1).Any(x => x.Count > highestValue))
            {
                // winner is someone else
                gameUpdate.WinnerUserId = groupedMoves.Skip(1).First(x => x.Count > highestValue).UserId;
            }
            else
            {
                gameUpdate.WinnerUserId = groupedMoves[0].UserId;
            }

            await _gameRepository.UpdateGameAsync(gameId, gameUpdate, cancellationToken: cancellationToken);
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
                await HandleWinnerAsync(game.Id, game.UserIds, cancellationToken: cancellationToken);
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
