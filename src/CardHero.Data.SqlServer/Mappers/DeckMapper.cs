using System;
using System.Linq;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class DeckMapper : IMapper<Deck, DeckData>
    {
        private readonly IMapper<DeckCardCollection, DeckCardData> _deckCardMapper;

        public DeckMapper(IMapper<DeckCardCollection, DeckCardData> deckCardMapper)
        {
            _deckCardMapper = deckCardMapper;
        }

        Expression<Func<Deck, DeckData>> IMapper<Deck, DeckData>.Map
        {
            get
            {
                return source => new DeckData
                {
                    Description = source.Description,
                    Id = source.DeckPk,
                    MaxCards = source.MaxCards,
                    Name = source.Name,
                    UserId = source.UserFk,

                    Cards = source.DeckCardCollection.AsQueryable().Select(_deckCardMapper.Map).ToArray(),
                };
            }
        }
    }
}
