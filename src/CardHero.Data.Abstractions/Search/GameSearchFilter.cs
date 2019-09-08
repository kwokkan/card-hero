namespace CardHero.Data.Abstractions
{
    public class GameSearchFilter
    {
        public int? GameId { get; set; }

        public GameType? Type { get; set; }
    }
}
