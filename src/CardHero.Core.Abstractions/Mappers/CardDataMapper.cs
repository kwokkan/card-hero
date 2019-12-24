using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class CardDataMapper : IDataMapper<CardData, CardModel>
    {
        CardModel IDataMapper<CardData, CardModel>.Map(CardData from)
        {
            return new CardModel
            {
                Attack = from.Attack,
                Defence = from.Defence,
                Description = from.Description,
                DownAttack = from.DownAttack,
                Health = from.Health,
                Id = from.Id,
                IsFavourited = from.IsFavourited,
                LeftAttack = from.LeftAttack,
                Name = from.Name,
                Rarity = (Rarity)from.Rarity.Id,
                RightAttack = from.RightAttack,
                TotalStats = from.TotalStats,
                UpAttack = from.UpAttack,
            };
        }

        CardData IDataMapper<CardData, CardModel>.Map(CardModel from)
        {
            throw new NotImplementedException();
        }
    }
}
