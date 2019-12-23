using System.Linq;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public static class EntityFrameworkExtensions
    {
        public static CardModel ToCore(this Card card, int? userId = null)
        {
            if (card == null)
            {
                return null;
            }

            return new CardModel
            {
                Description = card.Description,
                DownAttack = card.DownAttack,
                Id = card.CardPk,
                LeftAttack = card.LeftAttack,
                Name = card.Name,
                RightAttack = card.RightAttack,
                UpAttack = card.UpAttack,
                Health = card.Health,
                Attack = card.Attack,
                Defence = card.Defence,
                TotalStats = card.TotalStats,
                Rarity = (Models.Rarity)card.RarityFk,

                IsFavourited = !userId.HasValue ? false : card.CardFavourite.Any(x => x.UserFk == userId.Value),
            };
        }
    }
}
