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
        private readonly IMoveRepository _moveRepository;

        public MoveValidator(IMoveRepository moveRepository)
        {
            _moveRepository = moveRepository;
        }

        async Task IMoveValidator.ValidateMoveAsync(MoveModel move, GameModel game, CancellationToken cancellationToken)
        {
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
