using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Handlers
{
    public class AddUserToGameHandler : IAddUserToGameHandler
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IGameDeckRepository _gameDeckRepository;
        private readonly IGameRepository _gameRepository;
        private readonly ITurnRepository _turnRepository;

        public AddUserToGameHandler(
            IDeckRepository deckRepository,
            IGameDeckRepository gameDeckRepository,
            IGameRepository gameRepository,
            ITurnRepository turnRepository
        )
        {
            _deckRepository = deckRepository;
            _gameDeckRepository = gameDeckRepository;
            _gameRepository = gameRepository;
            _turnRepository = turnRepository;
        }

        async Task IAddUserToGameHandler.HandleAsync(int id, int userId, int deckId, CancellationToken cancellationToken)
        {
            var game = await _gameRepository.GetGameByIdAsync(id, cancellationToken: cancellationToken);

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            var gameUsers = await _gameRepository.GetGameUsersAsync(id, cancellationToken: cancellationToken);

            if (gameUsers.Any(x => x.Id == userId))
            {
                throw new InvalidPlayerException($"User { userId } is already in game { id }.");
            }

            var gul = gameUsers.Length;
            if (gul >= game.MaxPlayers)
            {
                throw new InvalidPlayerException($"Game { id } is already filled.");
            }

            var deck = await _deckRepository.GetDeckByIdAsync(deckId, userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException($"Deck { deckId } does not exist.");
            }

            if (deck.UserId != userId)
            {
                throw new InvalidDeckException($"Deck { deckId } does not belong to user { userId }.");
            }

            var dc = deck.Cards.Select(x => x.CardId).ToArray();
            var dcc = dc.Length;
            if (dcc < deck.MaxCards)
            {
                throw new InvalidDeckException($"Deck { deckId } needs { deck.MaxCards } cards. Currently only has { dcc }.");
            }

            await _gameDeckRepository.AddGameDeckAsync(id, userId, deck.Name, deck.Description, dc, cancellationToken: cancellationToken);

            if (gul + 1 == game.MaxPlayers)
            {
                var allUsers = gameUsers.Select(x => x.Id).Concat(new int[] { userId }).ToArray();
                await PrepareGameForPlayAsync(id, allUsers, cancellationToken);
            }
        }

        private async Task PrepareGameForPlayAsync(int id, int[] userIds, CancellationToken cancellationToken)
        {
            var randomUserIds = userIds.OrderBy(x => RandomNumberGenerator.GetInt32(int.MinValue, int.MaxValue)).ToArray();
            var currentUserId = randomUserIds[0];

            var updateGame = new GameUpdateData
            {
                CurrentUserId = currentUserId,
            };

            await _gameRepository.UpdateGameAsync(id, updateGame, cancellationToken: cancellationToken);

            await _gameRepository.UpdateGameUsersOrderAsync(id, randomUserIds, cancellationToken: cancellationToken);

            var newTurn = new TurnData
            {
                CurrentUserId = currentUserId,
                GameId = id,
            };
            await _turnRepository.AddTurnAsync(newTurn, cancellationToken: cancellationToken);
        }
    }
}
