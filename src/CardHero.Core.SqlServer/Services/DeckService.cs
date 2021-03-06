﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class DeckService : BaseService, IDeckService
    {
        private readonly ICardCollectionRepository _cardCollectionRepository;
        private readonly ICardRepository _cardRepository;
        private readonly IDeckRepository _deckRepository;

        private readonly IDataMapper<DeckData, DeckModel> _deckDataMapper;

        public DeckService(
            ICardCollectionRepository cardCollectionRepository,
            ICardRepository cardRepository,
            IDeckRepository deckRepository,
            IDataMapper<DeckData, DeckModel> deckDataMapper
        )
        {
            _cardCollectionRepository = cardCollectionRepository;
            _cardRepository = cardRepository;
            _deckRepository = deckRepository;

            _deckDataMapper = deckDataMapper;
        }

        private async Task<DeckModel> GetDeckByIdInternalAsync(int id, int userId, bool includeCards, CancellationToken cancellationToken)
        {
            var deck = await _deckRepository.GetDeckByIdAsync(id, userId, cancellationToken: cancellationToken);

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

                var cards = cardResults.Results;

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

        Task<DeckModel> IDeckService.GetDeckByIdAsync(int id, int userId, CancellationToken cancellationToken)
        {
            return GetDeckByIdInternalAsync(id, userId, true, cancellationToken);
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

        async Task IDeckService.FavouriteDeckAsync(int id, int userId, bool favourite, CancellationToken cancellationToken)
        {
            var deck = await _deckRepository.GetDeckByIdAsync(id, userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException($"Deck { id } does not exist.");
            }

            await _deckRepository.FavouriteDeckAsync(id, userId, favourite, cancellationToken: cancellationToken);
        }

        async Task IDeckService.UpdateCollectionAsync(int id, int userId, IEnumerable<int> cardCollectionIds, CancellationToken cancellationToken)
        {
            var deck = await _deckRepository.GetDeckByIdAsync(id, userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException("You do not have access to this deck.");
            }

            if (deck.UserId != userId)
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

            var deckUpdate = new DeckUpdateData
            {
                CardCollectionIds = distincted,
            };

            await _deckRepository.UpdateDeckAsync(id, deckUpdate, cancellationToken: cancellationToken);
        }

        Task IDeckService.UpdateDeckAsync(int deckId, DeckModel deck, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
