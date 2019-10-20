using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class GamePlayService : BaseService, IGamePlayService
    {
        private readonly IGameService _gameService;

        private readonly IGameDeckCardCollectionRepository _gameDeckCardCollectionRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IMoveRepository _moveRepository;

        public GamePlayService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IGameService gamseService,
            IGameDeckCardCollectionRepository gameDeckCardCollectionRepository,
            IGameRepository gameRepository,
            IMoveRepository moveRepository
        )
            : base(contextFactory)
        {
            _gameService = gamseService;

            _gameDeckCardCollectionRepository = gameDeckCardCollectionRepository;
            _gameRepository = gameRepository;
            _moveRepository = moveRepository;
        }

        private async Task<GameModel> ValidateMoveAsync(MoveModel move, CancellationToken cancellationToken = default)
        {
            var game = await _gameService.GetGameByIdAsync(move.GameId, move.UserId, cancellationToken: cancellationToken);

            if (game == null)
            {
                throw new InvalidGameException();
            }

            var gameUser = game.Users.SingleOrDefault(x => x.UserId == move.UserId);

            if (gameUser == null)
            {
                throw new InvalidPlayerException();
            }

            if (game.CurrentUser.Id != gameUser.Id)
            {
                throw new InvalidTurnException();
            }

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

            if (move.Row < 0 || move.Row >= game.Rows || move.Column < 0 || move.Column >= game.Columns)
            {
                throw new InvalidMoveException("Move must be made on the board.");
            }

            var moves = await _gameRepository.GetMovesByGameIdAsync(move.GameId);

            if (moves.Any(x => x.Row == move.Row && x.Column == move.Column))
            {
                throw new InvalidMoveException("There is already a card in this location.");
            }

            return game;
        }

        async Task IGamePlayService.MakeMoveAsync(MoveModel move, CancellationToken cancellationToken)
        {
            var game = await ValidateMoveAsync(move, cancellationToken: cancellationToken);

            var context = GetContext();
            {
                var currentTurn = await context.Game
                    .Include(x => x.Turn)
                    .Where(x => x.GamePk == game.Id)
                    .SelectMany(x => x.Turn)
                    .Where(x => !x.EndTime.HasValue)
                    .OrderByDescending(x => x.StartTime)
                    .FirstOrDefaultAsync(cancellationToken: cancellationToken);

                currentTurn.EndTime = DateTime.UtcNow;

                context.Update(currentTurn);

                var currentMove = new MoveData
                {
                    GameDeckCardCollectionId = move.GameDeckCardCollectionId,
                    Column = move.Column,
                    Row = move.Row,
                    TurnId = currentTurn.TurnPk,
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

                var newTurn = new Turn
                {
                    CurrentUserFk = nextUser.UserId,
                    GameFk = game.Id,
                    StartTime = DateTime.UtcNow,
                };

                context.Add(newTurn);

                var currentGame = await context.Game.SingleOrDefaultAsync(x => x.GamePk == game.Id, cancellationToken: cancellationToken);
                currentGame.CurrentUserFk = nextUser.Id;

                context.Update(currentGame);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }
    }
}
