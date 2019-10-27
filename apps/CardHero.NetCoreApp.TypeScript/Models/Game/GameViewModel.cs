using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameViewModel : GameModel
    {
        public object Data { get; set; }

        public GameViewModel()
        {
        }

        public GameViewModel(GameModel game)
        {
            this.Columns = game.Columns;
            this.CurrentGameUserId = game.CurrentGameUserId;
            this.CurrentUser = game.CurrentUser;
            this.Deck = game.Deck;
            this.DeckId = game.DeckId;
            this.EndTime = game.EndTime;
            this.GameDeck = game.GameDeck;
            this.GameDeckId = game.GameDeckId;
            this.Id = game.Id;
            this.MaxUsers = game.MaxUsers;
            this.Name = game.Name;
            this.Rows = game.Rows;
            this.StartTime = game.StartTime;
            this.Turns = game.Turns;
            this.Type = game.Type;
            this.Users = game.Users;
            this.Winner = game.Winner;
        }
    }
}
