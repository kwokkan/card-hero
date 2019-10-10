﻿using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class User
    {
        public User()
        {
            CardCollection = new HashSet<CardCollection>();
            Deck = new HashSet<Deck>();
            Turn = new HashSet<Turn>();
        }

        public int UserPk { get; set; }
        public string Identifier { get; set; }
        public DateTime CreatedDate { get; set; }
        public string FullName { get; set; }
        public string IdPsource { get; set; }
        public long Coins { get; set; }

        public virtual ICollection<CardCollection> CardCollection { get; set; }
        public virtual ICollection<Deck> Deck { get; set; }
        public virtual ICollection<Turn> Turn { get; set; }
    }
}
