using System.Collections.Generic;
using System.Linq;

using CardHero.Core.Models;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public static class DeckViewModelExtensions
    {
        public static DeckViewModel FromDeck(this DeckViewModel model, DeckModel deck)
        {
            if (model == null || deck == null)
            {
                return null;
            }

            model.Cards = deck.Cards == null ? new List<CardCollectionViewModel>() : deck.Cards.Select(x => new CardCollectionViewModel().FromDeckCard(x)).ToList();
            model.Description = deck.Description;
            model.Id = deck.Id;
            model.MaxCards = deck.MaxCards;
            model.Name = deck.Name;

            model.IsFavourited = deck.IsFavourited;

            return model;
        }
    }
}
