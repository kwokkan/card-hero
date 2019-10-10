﻿using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class Game
    {
        public Game()
        {
            Turn = new HashSet<Turn>();
        }

        public int GamePk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? CurrentGameUserFk { get; set; }
        public int? WinnerFk { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public int GameTypeFk { get; set; }
        public int MaxPlayers { get; set; }

        public virtual ICollection<Turn> Turn { get; set; }
    }
}
