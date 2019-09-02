using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class GameUser
    {
        public int GameUserPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int GameFk { get; set; }
        public int UserFk { get; set; }

        public virtual Game GameFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
    }
}
