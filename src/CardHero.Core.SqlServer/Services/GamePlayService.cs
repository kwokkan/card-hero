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
        private readonly ICardService _cardService;
        private readonly IGameService _gameService;
        private readonly IGameRepository _gameRepository;

        public GamePlayService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            ICardService cardService,
            IGameService gamseService,
            IGameRepository gameRepository
        )
            : base(contextFactory)
        {
            _cardService = cardService;
            _gameService = gamseService;
            _gameRepository = gameRepository;
        }

        private async Task<GameModel> ValidateMoveAsync(MoveModel move, CancellationToken cancellationToken = default)
        {
            var game = await _gameService.GetGameByIdAsync(move.GameId, move.UserId, cancellationToken: cancellationToken);

            if (game == null)
            {
                throw new InvalidGameException();
            }

            if (game.CurrentUser.Id != move.UserId)
            {
                throw new InvalidTurnException();
            }

            var card = (await _cardService.GetCardCollectionAsync(new CardCollectionSearchFilter
            {
                Ids = new int[] { move.CardCollectionId },
                UserId = move.UserId,
            })).Results.FirstOrDefault(x => x.Id == move.CardCollectionId);

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

        public async Task MakeMoveAsync(MoveModel move)
        {
            var game = await ValidateMoveAsync(move);

            var context = GetContext();
            {
                var currentTurn = context.Game
                    .Include(x => x.Turn)
                    .Where(x => x.GamePk == game.Id)
                    .SelectMany(x => x.Turn)
                    .Where(x => !x.EndTime.HasValue)
                    .OrderByDescending(x => x.StartTime)
                    .FirstOrDefault();

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

                var currentGame = context.Game.SingleOrDefault(x => x.GamePk == game.Id);
                currentGame.CurrentUserFk = nextUser.Id;

                context.Update(currentGame);

                await context.SaveChangesAsync();
            }
        }
    }
}
