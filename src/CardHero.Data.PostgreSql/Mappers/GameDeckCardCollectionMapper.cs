using System;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class GameDeckCardCollectionMapper : IMapper<GameDeckCardCollection, GameDeckCardCollectionData>
    {
        GameDeckCardCollectionData IMapper<GameDeckCardCollection, GameDeckCardCollectionData>.Map(GameDeckCardCollection from)
        {
            return new GameDeckCardCollectionData
            {
                CardId = from.CardFk,
                GameDeckId = from.GameDeckFk,
                Id = from.GameDeckCardCollectionPk,
            };
        }

        GameDeckCardCollection IMapper<GameDeckCardCollection, GameDeckCardCollectionData>.Map(GameDeckCardCollectionData from)
        {
            throw new NotImplementedException();
        }
    }
}
