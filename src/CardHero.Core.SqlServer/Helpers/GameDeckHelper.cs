using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Helpers
{
    public class GameDeckHelper : IGameDeckHelper
    {
        private readonly IGameDeckRepository _gameDeckRepository;

        private readonly IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> _gameDeckCardCollectionMapper;
        private readonly IDataMapper<GameDeckData, GameDeckModel> _gameDeckMapper;

        private readonly IGameDataService _gameDataService;
        private readonly ICardService _cardService;

        public GameDeckHelper(
            IGameDeckRepository gameDeckRepository,
            IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> gameDeckCardCollectionMapper,
            IDataMapper<GameDeckData, GameDeckModel> gameDeckMapper,
            IGameDataService gameDataService,
            ICardService cardService
        )
        {
            _gameDeckRepository = gameDeckRepository;

            _gameDeckCardCollectionMapper = gameDeckCardCollectionMapper;
            _gameDeckMapper = gameDeckMapper;

            _gameDataService = gameDataService;
            _cardService = cardService;
        }

        async Task IGameDeckHelper.PopulateDeckAsync(int? userId, GameModel game, GamePlayModel gamePlay, CancellationToken cancellationToken)
        {
            if (!userId.HasValue)
            {
                return;
            }

            await _gameDataService.PopulateGameUsersAsync(game, cancellationToken: cancellationToken);
            var uid = game.UserIds.SingleOrDefault(x => x == userId.Value);

            if (uid != default)
            {
                var gameDeck = await _gameDeckRepository.GetGameDeckByGameAndUserIdAsync(game.Id, uid, cancellationToken: cancellationToken);
                var deckCards = await _gameDeckRepository.GetGameDeckCardCollectionAsync(gameDeck.Id, cancellationToken: cancellationToken);

                gamePlay.GameDeckId = gameDeck.Id;
                gamePlay.GameDeck = _gameDeckMapper.Map(gameDeck);
                gamePlay.GameDeck.CardCollection = deckCards.Select(_gameDeckCardCollectionMapper.Map).ToArray();

                //TODO: Replace with data layer
                var cardFilter = new Abstractions.CardSearchFilter
                {
                    Ids = deckCards.Select(x => x.CardId).ToArray(),
                };
                var cards = await _cardService.GetCardsAsync(cardFilter, cancellationToken: cancellationToken);

                foreach (var cc in gamePlay.GameDeck.CardCollection)
                {
                    cc.Card = cards.Results.SingleOrDefault(x => x.Id == cc.CardId);
                }
            }
        }
    }
}
