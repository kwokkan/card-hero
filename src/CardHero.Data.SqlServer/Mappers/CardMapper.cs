using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class CardMapper : IMapper<Card, CardData>
    {
        CardData IMapper<Card, CardData>.Map(Card from)
        {
            return new CardData
            {
                Attack = from.Attack,
                Defence = from.Defence,
                Description = from.Description,
                DownAttack = from.DownAttack,
                Health = from.Health,
                Id = from.CardPk,
                LeftAttack = from.LeftAttack,
                Name = from.Name,
                Rarity = new RarityData
                {
                    Id = from.RarityFk,
                },
                RightAttack = from.RightAttack,
                TotalStats = from.TotalStats,
                UpAttack = from.UpAttack,
            };
        }

        Card IMapper<Card, CardData>.Map(CardData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
