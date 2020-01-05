using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class CardPackDataMapper : IDataMapper<CardPackData, CardPackModel>
    {
        CardPackModel IDataMapper<CardPackData, CardPackModel>.Map(CardPackData from)
        {
            return new CardPackModel
            {
                Description = from.Description,
                Id = from.Id,
                Name = from.Name,
            };
        }

        CardPackData IDataMapper<CardPackData, CardPackModel>.Map(CardPackModel from)
        {
            throw new NotImplementedException();
        }
    }
}
