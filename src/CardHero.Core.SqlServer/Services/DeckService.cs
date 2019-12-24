using System;
using System.Collections.Generic;
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
    public class DeckService : BaseService, IDeckService
    {
        private readonly ICardCollectionRepository _cardCollectionRepository;
        private readonly ICardRepository _cardRepository;
        private readonly IDeckRepository _deckRepository;

        private readonly IDataMapper<DeckData, DeckModel> _deckDataMapper;
        private readonly IDataMapper<CardData, CardModel> _cardDataMapper;

        public DeckService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            ICardCollectionRepository cardCollectionRepository,
            ICardRepository cardRepository,
            IDeckRepository deckRepository,
            IDataMapper<CardData, CardModel> cardDataMapper,
            IDataMapper<DeckData, DeckModel> deckDataMapper
        )
            : base(contextFactory)
        {
            _cardCollectionRepository = cardCollectionRepository;
            _cardRepository = cardRepository;
            _deckRepository = deckRepository;

            _cardDataMapper = cardDataMapper;
            _deckDataMapper = deckDataMapper;
        }

        private async Task<DeckModel> GetDeckByIdInternalAsync(int id, bool includeCards, CancellationToken cancellationToken)
        {
            var deck = await _deckRepository.GetDeckByIdAsync(id, cancellationToken: cancellationToken);

            var model = deck == null ? null : _deckDataMapper.Map(deck);

            if (includeCards && model != null)
            {
                var cardIds = deck.Cards.Select(x => x.CardId).ToArray();

                var cardResults = await _cardRepository.FindCardsAsync(
                    new Data.Abstractions.CardSearchFilter
                    {
                        Ids = cardIds,
                        UserId = deck.UserId,
                    },
                    cancellationToken: cancellationToken
                );

                var cards = cardResults.Results.Select(x => _cardDataMapper.Map(x)).ToList();

                model.Cards = model.Cards.Select(x => new DeckCardModel
                {
                    Card = cards.FirstOrDefault(c => c.Id == x.Card.Id),
                    CardCollectionId = x.CardCollectionId,
                });
            }

            return model;
        }

        async Task<DeckModel> IDeckService.CreateDeckAsync(DeckCreateModel deck, int userId, CancellationToken cancellationToken)
        {
            var newDeckCreate = new DeckCreateData
            {
                Description = deck.Description,
                MaxCards = 5,
                Name = deck.Name,
                UserId = userId,
            };

            var newDeck = await _deckRepository.CreateDeckAsync(newDeckCreate, cancellationToken: cancellationToken);

            return _deckDataMapper.Map(newDeck);
        }

        Task<DeckModel> IDeckService.GetDeckByIdAsync(int id, CancellationToken cancellationToken)
        {
            return GetDeckByIdInternalAsync(id, true, cancellationToken);
        }

        async Task<Abstractions.SearchResult<DeckModel>> IDeckService.GetDecksAsync(Abstractions.DeckSearchFilter filter, CancellationToken cancellationToken)
        {
            var decks = await _deckRepository.FindDecksAsync(
                new Data.Abstractions.DeckSearchFilter
                {
                    Ids = filter.Ids?.ToArray(),
                    Name = filter.Name,
                    UserId = filter.UserId,
                },
                cancellationToken: cancellationToken
            );

            var results = decks.Select(_deckDataMapper.Map).ToArray();

            var result = new Abstractions.SearchResult<DeckModel>
            {
                Count = decks.Count,
                Results = results,
            };

            return result;
        }

        async Task<bool> IDeckService.ToggleFavouriteAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var favourite = await context
                .DeckFavourite
                .SingleOrDefaultAsync(x => x.DeckFk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (favourite == null)
            {
                var newDeckFavourite = new DeckFavourite
                {
                    DeckFk = id,
                    UserFk = userId,
                };

                context.DeckFavourite.Add(newDeckFavourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return true;
            }
            else
            {
                context.DeckFavourite.Remove(favourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return false;
            }
        }

        async Task IDeckService.UpdateCollectionAsync(int id, int userId, IEnumerable<int> cardCollectionIds, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var deck = await context
                .Deck
                .FirstOrDefaultAsync(x => x.DeckPk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException("You do not have access to this deck.");
            }

            var distincted = (cardCollectionIds ?? Array.Empty<int>()).Distinct().ToArray();
            if (distincted.Length > deck.MaxCards)
            {
                throw new InvalidDeckException("Over maximum number of cards added.");
            }

            var cardCollectionResults = await _cardCollectionRepository.FindCardCollectionsAsync(
                new Data.Abstractions.CardCollectionSearchFilter
                {
                    Ids = distincted,
                    UserId = userId,
                },
                cancellationToken: cancellationToken
            );

            var ownedCount = cardCollectionResults.TotalCount;

            if (ownedCount != distincted.Length)
            {
                throw new InvalidCardException("You do not own some of the cards.");
            }

            var existingCards = await context
                .DeckCardCollection
                .Where(x => x.DeckFk == id)
                .ToListAsync(cancellationToken: cancellationToken);

            foreach (var ec in existingCards)
            {
                context.DeckCardCollection.Remove(ec);
            }

            foreach (var d in distincted)
            {
                context.DeckCardCollection.Add(new DeckCardCollection
                {
                    CardCollectionFk = d,
                    DeckFk = id,
                });
            }

            await context.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        Task IDeckService.UpdateDeckAsync(int deckId, DeckModel deck, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
