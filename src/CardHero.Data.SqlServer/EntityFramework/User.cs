using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class User
{
    public int UserPk { get; set; }

    public string Identifier { get; set; }

    public DateTime CreatedDate { get; set; }

    public string FullName { get; set; }

    public string IdPsource { get; set; }

    public long Coins { get; set; }

    public virtual ICollection<CardCollection> CardCollection { get; } = new List<CardCollection>();

    public virtual ICollection<CardFavourite> CardFavourite { get; } = new List<CardFavourite>();

    public virtual ICollection<Deck> Deck { get; } = new List<Deck>();

    public virtual ICollection<DeckFavourite> DeckFavourite { get; } = new List<DeckFavourite>();

    public virtual ICollection<Game> GameCurrentUserFkNavigation { get; } = new List<Game>();

    public virtual ICollection<GameUser> GameUser { get; } = new List<GameUser>();

    public virtual ICollection<Game> GameWinnerUserFkNavigation { get; } = new List<Game>();
}
