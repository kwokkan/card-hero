namespace CardHero.Core.Models
{
    /// <summary>
    /// Deck for use within a game.
    /// </summary>
    public class GameDeckModel
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Game user id.
        /// </summary>
        public int GameUserId { get; set; }
    }
}
