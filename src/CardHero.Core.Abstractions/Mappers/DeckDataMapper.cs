using System;
using System.Linq;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class DeckDataMapper : IDataMapper<DeckData, DeckModel>
    {
        DeckModel IDataMapper<DeckData, DeckModel>.Map(DeckData from)
        {
            return new DeckModel
            {
                Cards = from.Cards.Select(x => new DeckCardModel
                {
                    //TODO: populate cards correctly
                    Card = new CardModel
                    {
                        Id = x.CardId,
                    },
                    CardCollectionId = x.CardCollectionId,
                }),
                Description = from.Description,
                Id = from.Id,
                MaxCards = from.MaxCards,
                Name = from.Name,
            };
        }

        DeckData IDataMapper<DeckData, DeckModel>.Map(DeckModel from)
        {
            throw new NotImplementedException();
        }
    }
}
