namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class MoveViewModel
    {
        public int GameId { get; set; }

        public int GameDeckCardCollectionId { get; set; }

        public int Row { get; set; }

        public int Column { get; set; }
    }
}
