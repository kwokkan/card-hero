using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

namespace CardHero.Core.SqlServer.Services
{
    public class MoveUserService : BaseService, IMoveUserService
    {
        private static (int nextUserIndex, int nextUserId) GetNextUser(int currentIndex, IList<int> userIds)
        {
            var idx = currentIndex + 1;

            if (idx == userIds.Count)
            {
                idx = 0;
            }

            return (idx, userIds[idx]);
        }

        private static IEnumerable<MoveModel> ValidateInternal(IEnumerable<MoveModel> moves, IEnumerable<CardModel> cards, IEnumerable<int> userIds)
        {
            if (moves == null)
            {
                throw new ArgumentNullException(nameof(moves));
            }

            if (cards == null)
            {
                throw new ArgumentNullException(nameof(cards));
            }

            if (userIds == null)
            {
                throw new ArgumentNullException(nameof(userIds));
            }

            if (!moves.Any())
            {
                return moves;
            }

            foreach (var currentMove in moves)
            {
                if (!cards.Any(x => x.Id == currentMove.CardId))
                {
                    throw new InvalidCardException($"Card { currentMove.CardId } does not exist.");
                }

                if (!userIds.Any(x => x == currentMove.UserId))
                {
                    throw new InvalidPlayerException($"Player { currentMove.UserId } does not exist.");
                }
            }

            return null;
        }

        Task<IEnumerable<MoveModel>> IMoveUserService.PopulateMoveUsersAsync(IEnumerable<MoveModel> moves, IEnumerable<CardModel> cards, IEnumerable<int> userIds, CancellationToken cancellationToken)
        {
            var validate = ValidateInternal(moves, cards, userIds);

            if (validate != null)
            {
                return Task.FromResult(validate);
            }

            var newMoves = moves.OrderBy(x => x.StartTime).ToArray();
            var uids = userIds.ToList();
            var currentUserIndex = 0;
            var currentUserId = uids[currentUserIndex];
            int? previousUserId = null;

            foreach (var currentMove in newMoves)
            {
                if (previousUserId != null)
                {
                    var currentCard = cards.First(x => x.Id == currentMove.CardId);

                    var aboveMove = moves.Where(x => x.Column == currentMove.Column && x.Row == currentMove.Row - 1).FirstOrDefault();
                    if (aboveMove != null)
                    {
                        var aboveCard = cards.First(x => x.Id == aboveMove.CardId);

                        if (currentCard.UpAttack > aboveCard.DownAttack)
                        {
                            aboveMove.UserId = currentUserId;
                        }
                    }

                    var rightMove = moves.Where(x => x.Column == currentMove.Column + 1 && x.Row == currentMove.Row).FirstOrDefault();
                    if (rightMove != null)
                    {
                        var rightCard = cards.First(x => x.Id == rightMove.CardId);

                        if (currentCard.RightAttack > rightCard.LeftAttack)
                        {
                            rightMove.UserId = currentUserId;
                        }
                    }

                    var downMove = moves.Where(x => x.Column == currentMove.Column && x.Row == currentMove.Row + 1).FirstOrDefault();
                    if (downMove != null)
                    {
                        var downCard = cards.First(x => x.Id == downMove.CardId);

                        if (currentCard.DownAttack > downCard.UpAttack)
                        {
                            downMove.UserId = currentUserId;
                        }
                    }

                    var leftMove = moves.Where(x => x.Column == currentMove.Column - 1 && x.Row == currentMove.Row).FirstOrDefault();
                    if (leftMove != null)
                    {
                        var leftCard = cards.First(x => x.Id == leftMove.CardId);

                        if (currentCard.LeftAttack > leftCard.RightAttack)
                        {
                            leftMove.UserId = currentUserId;
                        }
                    }
                }

                previousUserId = currentUserId;

                var next = GetNextUser(currentUserIndex, uids);
                currentUserIndex = next.nextUserIndex;
                currentUserId = next.nextUserId;
            }

            return Task.FromResult<IEnumerable<MoveModel>>(newMoves);
        }
    }
}
