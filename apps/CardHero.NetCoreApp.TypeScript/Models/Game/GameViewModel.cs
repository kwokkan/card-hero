using System;

using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameViewModel : GameModel
    {
        public GameDataViewModel Data { get; set; }

        public DateTime LastActivity { get; set; }

        public GameViewModel()
        {
        }

        public GameViewModel(GameModel game)
        {
            this.Columns = game.Columns;
            this.CurrentUserId = game.CurrentUserId;
            this.Deck = game.Deck;
            this.DeckId = game.DeckId;
            this.EndTime = game.EndTime;
            this.GameDeck = game.GameDeck;
            this.GameDeckId = game.GameDeckId;
            this.Id = game.Id;
            this.MaxUsers = game.MaxUsers;
            this.Rows = game.Rows;
            this.StartTime = game.StartTime;
            this.Type = game.Type;
            this.Users = game.Users;
            this.WinnerUserId = game.WinnerUserId;
        }
    }
}
