using CardHero.Core.Models;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public static class CardCollectionViewModelExtensions
    {
        public static CardCollectionViewModel FromCardCollection(this CardCollectionViewModel model, CardCollection cardCollection)
        {
            if (model == null)
            {
                return null;
            }

            model.Card = new CardViewModel().FromCard(cardCollection.Card);

            model.CardCollectionId = cardCollection.Id;

            return model;
        }

        public static CardCollectionViewModel FromDeckCard(this CardCollectionViewModel model, DeckCard deckCard)
        {
            if (model == null)
            {
                return null;
            }

            model.Card = new CardViewModel().FromCard(deckCard);

            model.CardCollectionId = deckCard.CardCollectionId;

            return model;
        }
    }
}
