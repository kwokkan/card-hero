namespace CardHero.Core.Models
{
    /// <summary>
    /// Represents a move by a player.
    /// </summary>
    public class MoveModel
    {
        /// <summary>
        /// The game to make a move on.
        /// </summary>
        public int GameId { get; set; }

        /// <summary>
        /// The card to play.
        /// </summary>
        public int GameDeckCardCollectionId { get; set; }

        /// <summary>
        /// Zero based index of the row.
        /// </summary>
        public int Row { get; set; }

        /// <summary>
        /// Zero based index of the column.
        /// </summary>
        public int Column { get; set; }

        /// <summary>
        /// The user making the move.
        /// </summary>
        public int UserId { get; set; }
    }
}
