using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class CardCollectionDataMapper : IDataMapper<CardCollectionData, CardCollectionModel>
    {
        CardCollectionModel IDataMapper<CardCollectionData, CardCollectionModel>.Map(CardCollectionData from)
        {
            return new CardCollectionModel
            {
                CardId = from.CardId,
                Id = from.Id,
                UserId = from.UserId,
            };
        }

        CardCollectionData IDataMapper<CardCollectionData, CardCollectionModel>.Map(CardCollectionModel from)
        {
            throw new NotImplementedException();
        }
    }
}
