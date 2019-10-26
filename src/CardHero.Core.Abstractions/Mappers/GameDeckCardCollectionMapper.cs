using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameDeckCardCollectionMapper : IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel>
    {
        GameDeckCardCollectionModel IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel>.Map(GameDeckCardCollectionData from)
        {
            return new GameDeckCardCollectionModel
            {
                CardId = from.CardId,
                GameDeckId = from.GameDeckId,
                Id = from.Id,
            };
        }

        GameDeckCardCollectionData IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel>.Map(GameDeckCardCollectionModel from)
        {
            throw new NotImplementedException();
        }
    }
}
