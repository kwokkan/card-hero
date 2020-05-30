using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer
{
    internal class MoveValidator : IMoveValidator
    {
        private readonly IGameDeckCardCollectionRepository _gameDeckCardCollectionRepository;
        private readonly IMoveRepository _moveRepository;

        public MoveValidator(
            IGameDeckCardCollectionRepository gameDeckCardCollectionRepository,
            IMoveRepository moveRepository
        )
        {
            _gameDeckCardCollectionRepository = gameDeckCardCollectionRepository;
            _moveRepository = moveRepository;
        }

        async Task IMoveValidator.ValidateMoveAsync(MoveModel move, GameModel game, CancellationToken cancellationToken)
        {
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

            var moves = await _moveRepository.GetMovesByGameIdAsync(move.GameId);

            if (moves.Any(x => x.Row == move.Row && x.Column == move.Column))
            {
                throw new InvalidMoveException("There is already a card in this location.");
            }
        }
    }
}
