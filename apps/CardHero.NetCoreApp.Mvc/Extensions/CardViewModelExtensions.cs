using CardHero.Core.Models;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public static class CardViewModelExtensions
    {
        public static CardViewModel FromCard(this CardViewModel model, CardModel card)
        {
            if (model == null)
            {
                return null;
            }

            model.Attack = card.Attack;
            model.Defence = card.Defence;
            model.Description = card.Description;
            model.DownAttack = card.DownAttack;
            model.Health = card.Health;
            model.Id = card.Id;
            model.LeftAttack = card.LeftAttack;
            model.Name = card.Name;
            model.RightAttack = card.RightAttack;
            model.UpAttack = card.UpAttack;
            model.TotalStats = card.TotalStats;

            model.IsFavourited = card.IsFavourited;

            return model;
        }
    }
}
