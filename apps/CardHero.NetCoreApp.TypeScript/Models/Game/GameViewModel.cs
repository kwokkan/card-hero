using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript.Models
{
    public class GameViewModel : Game
    {
        public object Data { get; set; }

        public GameViewModel()
        {
        }

        public GameViewModel(Game game)
        {
            this.Deck = game.Deck;
            this.Id = game.Id;
            this.Name = game.Name;
            this.StartTime = game.StartTime;
            this.Type = game.Type;
        }
    }
}
