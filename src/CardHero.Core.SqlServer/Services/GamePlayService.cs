using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class GamePlayService : BaseService, IGamePlayService
    {
        private readonly ICardService _cardService;
        private readonly IGameService _gameService;

        public GamePlayService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            ICardService cardService,
            IGameService gamseService
        )
            : base(contextFactory)
        {
            _cardService = cardService;
            _gameService = gamseService;
        }

        private async Task<GameModel> ValidateMoveAsync(MoveModel move, CancellationToken cancellationToken = default)
        {
            var game = (await _gameService.GetGamesAsync(
                new GameSearchFilter
                {
                    GameId = move.GameId,
                }, cancellationToken: cancellationToken)).Results.FirstOrDefault();

            if (game == null)
            {
                throw new InvalidGameException();
            }

            if (game.CurrentUser.Id != move.UserId)
            {
                throw new InvalidTurnException();
            }

            var card = (await _cardService.GetCardCollectionAsync(
                new CardCollectionSearchFilter
                {
                    Ids = new int[] { move.CardCollectionId },
                    UserId = move.UserId,
                }, cancellationToken: cancellationToken)).Results.FirstOrDefault(x => x.Id == move.CardCollectionId);

            if (card == null)
            {
                throw new InvalidCardException();
            }

            if (move.Row < 0 || move.Row >= game.Rows || move.Column < 0 || move.Column >= game.Columns)
            {
                throw new InvalidMoveException();
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

                var currentMove = new Move
                {
                    CardCollectionFk = move.CardCollectionId,
                    Column = move.Column,
                    CreatedTime = DateTime.UtcNow,
                    Row = move.Row,
                    TurnFk = currentTurn.TurnPk,
                };

                context.Add(currentMove);

                var nextUser = game.Users
                    .SkipWhile(x => x.Id != move.UserId)
                    .Skip(1)
                    .FirstOrDefault();

                if (nextUser == null)
                {
                    nextUser = game.Users.First();
                }

                var newTurn = new Turn
                {
                    CurrentUserFk = nextUser.Id,
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
