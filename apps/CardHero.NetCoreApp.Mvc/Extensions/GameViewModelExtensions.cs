using CardHero.Core.Models;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public static class GameViewModelExtensions
    {
        public static GameViewModel FromGame(this GameViewModel model, Game game)
        {
            if (model == null)
            {
                return null;
            }

            model.Deck = new DeckViewModel().FromDeck(game.Deck);
            model.Id = game.Id;
            model.Name = game.Name;
            model.StartTime = game.StartTime;
            model.Type = game.Type;

            return model;
        }
    }
}
