using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class CardHeroDataDbContext : DbContext
    {
        public CardHeroDataDbContext()
        {
        }

        public CardHeroDataDbContext(DbContextOptions<CardHeroDataDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Card> Card { get; set; }
        public virtual DbSet<CardCollection> CardCollection { get; set; }
        public virtual DbSet<CardFavourite> CardFavourite { get; set; }
        public virtual DbSet<CardPack> CardPack { get; set; }
        public virtual DbSet<Deck> Deck { get; set; }
        public virtual DbSet<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual DbSet<DeckFavourite> DeckFavourite { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<GameDeck> GameDeck { get; set; }
        public virtual DbSet<GameDeckCardCollection> GameDeckCardCollection { get; set; }
        public virtual DbSet<GameUser> GameUser { get; set; }
        public virtual DbSet<Move> Move { get; set; }
        public virtual DbSet<Rarity> Rarity { get; set; }
        public virtual DbSet<StoreItem> StoreItem { get; set; }
        public virtual DbSet<Turn> Turn { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>(entity =>
            {
                entity.HasKey(e => e.CardPk);

                entity.HasIndex(e => e.CardPackFk, "IX_Card_CardPack_FK");

                entity.HasIndex(e => e.RarityFk, "IX_Card_Rarity_FK");

                entity.HasIndex(e => new { e.CardPackFk, e.CardPackId }, "UX_Card_CardPack_FK_CardPackId")
                    .IsUnique();

                entity.Property(e => e.CardPk).HasColumnName("Card_PK");

                entity.Property(e => e.Attack).HasDefaultValueSql("1");

                entity.Property(e => e.CardPackFk)
                    .HasColumnName("CardPack_FK")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.Defence).HasDefaultValueSql("1");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.DownAttack).HasDefaultValueSql("1");

                entity.Property(e => e.Health).HasDefaultValueSql("1");

                entity.Property(e => e.LeftAttack).HasDefaultValueSql("1");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.RarityFk)
                    .HasColumnName("Rarity_FK")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.RightAttack).HasDefaultValueSql("1");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.TotalStats).HasComputedColumnSql("((((((\"UpAttack\" + \"RightAttack\") + \"DownAttack\") + \"LeftAttack\") + \"Health\") + \"Attack\") + \"Defence\")", true);

                entity.Property(e => e.UpAttack).HasDefaultValueSql("1");

                entity.HasOne(d => d.RarityFkNavigation)
                    .WithMany(p => p.Card)
                    .HasForeignKey(d => d.RarityFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Card_Rarity_FK");
            });

            modelBuilder.Entity<CardCollection>(entity =>
            {
                entity.HasKey(e => e.CardCollectionPk);

                entity.HasIndex(e => e.CardFk, "IX_CardCollection_Card_FK");

                entity.HasIndex(e => e.UserFk, "IX_CardCollection_User_FK");

                entity.Property(e => e.CardCollectionPk).HasColumnName("CardCollection_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("now()");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.CardCollection)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CardCollection_Card_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.CardCollection)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CardCollection_User_FK");
            });

            modelBuilder.Entity<CardFavourite>(entity =>
            {
                entity.HasKey(e => e.CardFavouritePk);

                entity.HasIndex(e => e.UserFk, "IX_CardFavourite_User_FK");

                entity.HasIndex(e => new { e.CardFk, e.UserFk }, "UX_CardFavourite_Card_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.CardFavouritePk).HasColumnName("CardFavourite_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.CardFavourite)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CardFavourite_Card_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.CardFavourite)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CardFavourite_User_FK");
            });

            modelBuilder.Entity<CardPack>(entity =>
            {
                entity.HasKey(e => e.CardPackPk);

                entity.Property(e => e.CardPackPk)
                    .ValueGeneratedNever()
                    .HasColumnName("CardPack_PK");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Deck>(entity =>
            {
                entity.HasKey(e => e.DeckPk);

                entity.HasIndex(e => e.UserFk, "IX_Deck_User_FK");

                entity.Property(e => e.DeckPk).HasColumnName("Deck_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("now()");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.Deck)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Deck_User_FK");
            });

            modelBuilder.Entity<DeckCardCollection>(entity =>
            {
                entity.HasKey(e => e.DeckCardCollectionPk);

                entity.HasIndex(e => e.CardCollectionFk, "IX_DeckCardCollection_CardCollection_FK");

                entity.HasIndex(e => e.DeckFk, "IX_DeckCardCollection_Deck_FK");

                entity.Property(e => e.DeckCardCollectionPk).HasColumnName("DeckCardCollection_PK");

                entity.Property(e => e.CardCollectionFk).HasColumnName("CardCollection_FK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.HasOne(d => d.CardCollectionFkNavigation)
                    .WithMany(p => p.DeckCardCollection)
                    .HasForeignKey(d => d.CardCollectionFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_DeckCardCollection_CardCollection_FK");

                entity.HasOne(d => d.DeckFkNavigation)
                    .WithMany(p => p.DeckCardCollection)
                    .HasForeignKey(d => d.DeckFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_DeckCardCollection_Deck_FK");
            });

            modelBuilder.Entity<DeckFavourite>(entity =>
            {
                entity.HasKey(e => e.DeckFavouritePk);

                entity.HasIndex(e => e.UserFk, "IX_DeckFavourite_User_FK");

                entity.HasIndex(e => new { e.DeckFk, e.UserFk }, "UX_DeckFavourite_Deck_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.DeckFavouritePk).HasColumnName("DeckFavourite_PK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.DeckFkNavigation)
                    .WithMany(p => p.DeckFavourite)
                    .HasForeignKey(d => d.DeckFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_DeckFavourite_Deck_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.DeckFavourite)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_DeckFavourite_User_FK");
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasKey(e => e.GamePk);

                entity.HasIndex(e => e.CurrentUserFk, "IX_Game_CurrentUser_FK");

                entity.HasIndex(e => e.GameTypeFk, "IX_Game_GameType_FK");

                entity.HasIndex(e => e.WinnerUserFk, "IX_Game_WinnerUser_FK");

                entity.Property(e => e.GamePk).HasColumnName("Game_PK");

                entity.Property(e => e.Columns).HasDefaultValueSql("3");

                entity.Property(e => e.CurrentUserFk).HasColumnName("CurrentUser_FK");

                entity.Property(e => e.GameTypeFk)
                    .HasColumnName("GameType_FK")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.MaxPlayers).HasDefaultValueSql("2");

                entity.Property(e => e.Rows).HasDefaultValueSql("3");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.StartTime).HasDefaultValueSql("now()");

                entity.Property(e => e.WinnerUserFk).HasColumnName("WinnerUser_FK");

                entity.HasOne(d => d.CurrentUserFkNavigation)
                    .WithMany(p => p.GameCurrentUserFkNavigation)
                    .HasForeignKey(d => d.CurrentUserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Game_CurrentUser_FK");

                entity.HasOne(d => d.WinnerUserFkNavigation)
                    .WithMany(p => p.GameWinnerUserFkNavigation)
                    .HasForeignKey(d => d.WinnerUserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Game_WinnerUser_FK");
            });

            modelBuilder.Entity<GameDeck>(entity =>
            {
                entity.HasKey(e => e.GameDeckPk);

                entity.HasIndex(e => e.GameUserFk, "IX_GameDeck_GameUser_FK");

                entity.Property(e => e.GameDeckPk).HasColumnName("GameDeck_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("now()");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.GameUserFk).HasColumnName("GameUser_FK");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.HasOne(d => d.GameUserFkNavigation)
                    .WithMany(p => p.GameDeck)
                    .HasForeignKey(d => d.GameUserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GameDeck_GameUser_FK");
            });

            modelBuilder.Entity<GameDeckCardCollection>(entity =>
            {
                entity.HasKey(e => e.GameDeckCardCollectionPk);

                entity.HasIndex(e => e.CardFk, "IX_GameDeckCardCollection_Card_FK");

                entity.HasIndex(e => e.GameDeckFk, "IX_GameDeckCardCollection_GameDeck_FK");

                entity.Property(e => e.GameDeckCardCollectionPk).HasColumnName("GameDeckCardCollection_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.GameDeckFk).HasColumnName("GameDeck_FK");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.GameDeckCardCollection)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GameDeckCardCollection_Card_FK");

                entity.HasOne(d => d.GameDeckFkNavigation)
                    .WithMany(p => p.GameDeckCardCollection)
                    .HasForeignKey(d => d.GameDeckFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GameDeckCardCollection_GameDeck_FK");
            });

            modelBuilder.Entity<GameUser>(entity =>
            {
                entity.HasKey(e => e.GameUserPk);

                entity.HasIndex(e => e.GameFk, "IX_GameUser_Game_FK");

                entity.HasIndex(e => e.UserFk, "IX_GameUser_User_FK");

                entity.Property(e => e.GameUserPk).HasColumnName("GameUser_PK");

                entity.Property(e => e.GameFk).HasColumnName("Game_FK");

                entity.Property(e => e.JoinedTime).HasDefaultValueSql("now()");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.GameUser)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GameUser_Game");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.GameUser)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_GameUser_User");
            });

            modelBuilder.Entity<Move>(entity =>
            {
                entity.HasKey(e => e.MovePk);

                entity.HasIndex(e => e.GameDeckCardCollectionFk, "IX_Move_GameDeckCardCollection_FK");

                entity.HasIndex(e => e.TurnFk, "IX_Move_Turn_FK");

                entity.Property(e => e.MovePk).HasColumnName("Move_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("now()");

                entity.Property(e => e.GameDeckCardCollectionFk).HasColumnName("GameDeckCardCollection_FK");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.TurnFk).HasColumnName("Turn_FK");

                entity.HasOne(d => d.GameDeckCardCollectionFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.GameDeckCardCollectionFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Move_CardCollection_FK");

                entity.HasOne(d => d.TurnFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.TurnFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Move_Turn_FK");
            });

            modelBuilder.Entity<Rarity>(entity =>
            {
                entity.HasKey(e => e.RarityPk);

                entity.Property(e => e.RarityPk).HasColumnName("Rarity_PK");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<StoreItem>(entity =>
            {
                entity.HasKey(e => e.StoreItemPk);

                entity.HasIndex(e => e.CardPackFk, "IX_StoreItem_CardPack_FK");

                entity.Property(e => e.StoreItemPk).HasColumnName("StoreItem_PK");

                entity.Property(e => e.CardPackFk).HasColumnName("CardPack_FK");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.ItemCount).HasDefaultValueSql("1");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.HasOne(d => d.CardPackFkNavigation)
                    .WithMany(p => p.StoreItem)
                    .HasForeignKey(d => d.CardPackFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_StoreItem_CardPack_FK");
            });

            modelBuilder.Entity<Turn>(entity =>
            {
                entity.HasKey(e => e.TurnPk);

                entity.HasIndex(e => e.CurrentGameUserFk, "IX_Turn_CurrentGameUser_FK");

                entity.HasIndex(e => e.GameFk, "IX_Turn_Game_FK");

                entity.Property(e => e.TurnPk).HasColumnName("Turn_PK");

                entity.Property(e => e.CurrentGameUserFk).HasColumnName("CurrentGameUser_FK");

                entity.Property(e => e.GameFk).HasColumnName("Game_FK");

                entity.Property(e => e.Rowstamp).ValueGeneratedOnAdd();

                entity.Property(e => e.StartTime).HasDefaultValueSql("now()");

                entity.HasOne(d => d.CurrentGameUserFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.CurrentGameUserFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Turn_CurrentGameUser_FK");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Turn_Game_FK");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserPk);

                entity.HasIndex(e => new { e.Identifier, e.IdPsource }, "UX_User_Identifier")
                    .IsUnique();

                entity.Property(e => e.UserPk).HasColumnName("User_PK");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("now()");

                entity.Property(e => e.FullName).HasMaxLength(200);

                entity.Property(e => e.IdPsource)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("IdPSource");

                entity.Property(e => e.Identifier)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
