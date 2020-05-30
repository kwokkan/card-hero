using CardHero.Core.Models;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class CardMapper : IMapper<Card, CardModel>
    {
        CardModel IMapper<Card, CardModel>.Map(Card from)
        {
            return new CardModel
            {
                Attack = from.Attack,
                Defence = from.Defence,
                Description = from.Description,
                DownAttack = from.DownAttack,
                Health = from.Health,
                Id = from.CardPk,
                LeftAttack = from.LeftAttack,
                Name = from.Name,
                Rarity = new RarityModel
                {
                    Id = (Core.Models.Rarity)from.RarityFk,
                    Frequency = from.RarityFkNavigation.Frequency,
                    Name = from.RarityFkNavigation.Name,
                },
                RightAttack = from.RightAttack,
                TotalStats = from.TotalStats,
                UpAttack = from.UpAttack,
            };
        }

        Card IMapper<Card, CardModel>.Map(CardModel from)
        {
            throw new System.NotImplementedException();
        }
    }
}
