using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class Player
    {
        public int PlayerPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
    }
}
