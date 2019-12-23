﻿using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer.EntityFramework
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
        public virtual DbSet<Deck> Deck { get; set; }
        public virtual DbSet<DeckCardCollection> DeckCardCollection { get; set; }
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

                entity.HasIndex(e => e.RarityFk);

                entity.Property(e => e.CardPk).HasColumnName("Card_PK");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Health).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.RarityFk)
                    .HasColumnName("Rarity_FK")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.TotalStats).HasComputedColumnSql("(isnull(((((([UpAttack]+[RightAttack])+[DownAttack])+[LeftAttack])+[Health])+[Attack])+[Defence],(0)))");

                entity.HasOne(d => d.RarityFkNavigation)
                    .WithMany(p => p.Card)
                    .HasForeignKey(d => d.RarityFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Card_Rarity_FK");
            });

            modelBuilder.Entity<CardCollection>(entity =>
            {
                entity.HasKey(e => e.CardCollectionPk);

                entity.HasIndex(e => e.CardFk);

                entity.HasIndex(e => e.UserFk);

                entity.Property(e => e.CardCollectionPk).HasColumnName("CardCollection_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.CardCollection)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CardCollection_Card_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.CardCollection)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CardCollection_User_FK");
            });

            modelBuilder.Entity<Deck>(entity =>
            {
                entity.HasKey(e => e.DeckPk);

                entity.HasIndex(e => e.UserFk);

                entity.Property(e => e.DeckPk).HasColumnName("Deck_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.Deck)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Deck_User_FK");
            });

            modelBuilder.Entity<DeckCardCollection>(entity =>
            {
                entity.HasKey(e => e.DeckCardCollectionPk);

                entity.HasIndex(e => e.CardCollectionFk);

                entity.HasIndex(e => e.DeckFk);

                entity.Property(e => e.DeckCardCollectionPk).HasColumnName("DeckCardCollection_PK");

                entity.Property(e => e.CardCollectionFk).HasColumnName("CardCollection_FK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.Rowstamp)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.HasOne(d => d.CardCollectionFkNavigation)
                    .WithMany(p => p.DeckCardCollection)
                    .HasForeignKey(d => d.CardCollectionFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeckCardCollection_CardCollection_FK");

                entity.HasOne(d => d.DeckFkNavigation)
                    .WithMany(p => p.DeckCardCollection)
                    .HasForeignKey(d => d.DeckFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeckCardCollection_Deck_FK");
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasKey(e => e.GamePk);

                entity.HasIndex(e => e.CurrentGameUserFk);

                entity.HasIndex(e => e.GameTypeFk);

                entity.HasIndex(e => e.WinnerFk);

                entity.Property(e => e.GamePk).HasColumnName("Game_PK");

                entity.Property(e => e.Columns).HasDefaultValueSql("((3))");

                entity.Property(e => e.CurrentGameUserFk).HasColumnName("CurrentGameUser_FK");

                entity.Property(e => e.GameTypeFk)
                    .HasColumnName("GameType_FK")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.MaxPlayers).HasDefaultValueSql("((2))");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Rows).HasDefaultValueSql("((3))");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.StartTime).HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.WinnerFk).HasColumnName("Winner_FK");

                entity.HasOne(d => d.CurrentGameUserFkNavigation)
                    .WithMany(p => p.GameCurrentGameUserFkNavigation)
                    .HasForeignKey(d => d.CurrentGameUserFk)
                    .HasConstraintName("FK_Game_CurrentUser_FK");

                entity.HasOne(d => d.WinnerFkNavigation)
                    .WithMany(p => p.GameWinnerFkNavigation)
                    .HasForeignKey(d => d.WinnerFk)
                    .HasConstraintName("FK_Game_Winner_FK");
            });

            modelBuilder.Entity<GameDeck>(entity =>
            {
                entity.HasKey(e => e.GameDeckPk);

                entity.HasIndex(e => e.GameUserFk);

                entity.Property(e => e.GameDeckPk).HasColumnName("GameDeck_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.GameUserFk).HasColumnName("GameUser_FK");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.HasOne(d => d.GameUserFkNavigation)
                    .WithMany(p => p.GameDeck)
                    .HasForeignKey(d => d.GameUserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameDeck_GameUser_FK");
            });

            modelBuilder.Entity<GameDeckCardCollection>(entity =>
            {
                entity.HasKey(e => e.GameDeckCardCollectionPk);

                entity.HasIndex(e => e.CardFk);

                entity.HasIndex(e => e.GameDeckFk);

                entity.Property(e => e.GameDeckCardCollectionPk).HasColumnName("GameDeckCardCollection_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.GameDeckFk).HasColumnName("GameDeck_FK");

                entity.Property(e => e.Rowstamp)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.GameDeckCardCollection)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameDeckCardCollection_Card_FK");

                entity.HasOne(d => d.GameDeckFkNavigation)
                    .WithMany(p => p.GameDeckCardCollection)
                    .HasForeignKey(d => d.GameDeckFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameDeckCardCollection_GameDeck_FK");
            });

            modelBuilder.Entity<GameUser>(entity =>
            {
                entity.HasKey(e => e.GameUserPk);

                entity.HasIndex(e => e.GameFk);

                entity.HasIndex(e => e.UserFk);

                entity.Property(e => e.GameUserPk).HasColumnName("GameUser_PK");

                entity.Property(e => e.GameFk).HasColumnName("Game_FK");

                entity.Property(e => e.JoinedTime)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.GameUser)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameUser_Game");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.GameUser)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameUser_User");
            });

            modelBuilder.Entity<Move>(entity =>
            {
                entity.HasKey(e => e.MovePk);

                entity.HasIndex(e => e.GameDeckCardCollectionFk);

                entity.HasIndex(e => e.TurnFk);

                entity.Property(e => e.MovePk).HasColumnName("Move_PK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.GameDeckCardCollectionFk).HasColumnName("GameDeckCardCollection_FK");

                entity.Property(e => e.Rowstamp)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.TurnFk).HasColumnName("Turn_FK");

                entity.HasOne(d => d.GameDeckCardCollectionFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.GameDeckCardCollectionFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Move_CardCollection_FK");

                entity.HasOne(d => d.TurnFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.TurnFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Move_Turn_FK");
            });

            modelBuilder.Entity<Rarity>(entity =>
            {
                entity.HasKey(e => e.RarityPk);

                entity.Property(e => e.RarityPk).HasColumnName("Rarity_PK");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<StoreItem>(entity =>
            {
                entity.HasKey(e => e.StoreItemPk);

                entity.Property(e => e.StoreItemPk).HasColumnName("StoreItem_PK");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.ItemCount).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<Turn>(entity =>
            {
                entity.HasKey(e => e.TurnPk);

                entity.HasIndex(e => e.CurrentGameUserFk);

                entity.HasIndex(e => e.GameFk);

                entity.Property(e => e.TurnPk).HasColumnName("Turn_PK");

                entity.Property(e => e.CurrentGameUserFk).HasColumnName("CurrentGameUser_FK");

                entity.Property(e => e.GameFk).HasColumnName("Game_FK");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.StartTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.CurrentGameUserFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.CurrentGameUserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Turn_CurrentUser_FK");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Turn_Game_FK");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserPk);

                entity.HasIndex(e => new { e.Identifier, e.IdPsource })
                    .HasName("UX_User_Identifier")
                    .IsUnique();

                entity.Property(e => e.UserPk).HasColumnName("User_PK");

                entity.Property(e => e.CreatedDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FullName).HasMaxLength(200);

                entity.Property(e => e.IdPsource)
                    .IsRequired()
                    .HasColumnName("IdPSource")
                    .HasMaxLength(50);

                entity.Property(e => e.Identifier)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
