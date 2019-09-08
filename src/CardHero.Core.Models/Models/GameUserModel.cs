using System;
using System.Collections.Generic;
using System.Text;

namespace CardHero.Core.Models
{
    /// <summary>
    /// User belonging to a game.
    /// </summary>
    public class GameUserModel
    {
        /// <summary>
        /// Game user id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User id.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// User.
        /// </summary>
        public UserModel User { get; set; }

        /// <summary>
        /// Game id.
        /// </summary>
        public int GameId { get; set; }

        /// <summary>
        /// Order of the players.
        /// </summary>
        public int? Order { get; set; }
    }
}
