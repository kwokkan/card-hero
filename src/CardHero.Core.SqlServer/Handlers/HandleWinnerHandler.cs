using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Handlers
{
    public class HandleWinnerHandler : IHandleWinnerHandler
    {
        private readonly IGameRepository _gameRepository;

        private readonly ICardService _cardService;
        private readonly IMoveService _moveService;
        private readonly IMoveUserService _moveUserService;

        public HandleWinnerHandler(
            IGameRepository gameRepository,
            ICardService cardService,
            IMoveService moveService,
            IMoveUserService moveUserService
        )
        {
            _gameRepository = gameRepository;

            _cardService = cardService;
            _moveService = moveService;
            _moveUserService = moveUserService;
        }

        async Task IHandleWinnerHandler.HandleAsync(int gameId, IEnumerable<int> userIds, CancellationToken cancellationToken)
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
    }
}
