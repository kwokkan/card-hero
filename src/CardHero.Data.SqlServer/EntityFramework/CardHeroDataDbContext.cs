using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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

        public virtual DbSet<Deck> Deck { get; set; }
        public virtual DbSet<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<GameDeck> GameDeck { get; set; }
        public virtual DbSet<GameDeckCardCollection> GameDeckCardCollection { get; set; }
        public virtual DbSet<GameUser> GameUser { get; set; }
        public virtual DbSet<Move> Move { get; set; }
        public virtual DbSet<Turn> Turn { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

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

                entity.Property(e => e.Rowstamp).IsRowVersion();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");
            });

            modelBuilder.Entity<DeckCardCollection>(entity =>
            {
                entity.HasKey(e => e.DeckCardCollectionPk);

                entity.HasIndex(e => e.CardCollectionFk);

                entity.HasIndex(e => e.DeckFk);

                entity.Property(e => e.DeckCardCollectionPk).HasColumnName("DeckCardCollection_PK");

                entity.Property(e => e.CardCollectionFk).HasColumnName("CardCollection_FK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.Rowstamp).IsRowVersion();

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

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Rows).HasDefaultValueSql("((3))");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion();

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
                    .IsRowVersion();

                entity.HasOne(d => d.GameUserFkNavigation)
                    .WithMany(p => p.GameDeck)
                    .HasForeignKey(d => d.GameUserFk)
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

                entity.Property(e => e.Rowstamp).IsRowVersion();

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
                    .IsRowVersion();

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.GameUser)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GameUser_Game");
            });

            modelBuilder.Entity<Move>(entity =>
            {
                entity.HasKey(e => e.MovePk);

                entity.HasIndex(e => e.CardCollectionFk);

                entity.HasIndex(e => e.TurnFk);

                entity.Property(e => e.MovePk).HasColumnName("Move_PK");

                entity.Property(e => e.CardCollectionFk).HasColumnName("CardCollection_FK");

                entity.Property(e => e.CreatedTime).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Rowstamp).HasMaxLength(10);

                entity.Property(e => e.TurnFk).HasColumnName("Turn_FK");

                entity.HasOne(d => d.TurnFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.TurnFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Move_Turn_FK");
            });

            modelBuilder.Entity<Turn>(entity =>
            {
                entity.HasKey(e => e.TurnPk);

                entity.HasIndex(e => e.CurrentUserFk);

                entity.HasIndex(e => e.GameFk);

                entity.Property(e => e.TurnPk).HasColumnName("Turn_PK");

                entity.Property(e => e.CurrentUserFk).HasColumnName("CurrentUser_FK");

                entity.Property(e => e.GameFk).HasColumnName("Game_FK");

                entity.Property(e => e.Rowstamp)
                    .IsRequired()
                    .IsRowVersion();

                entity.Property(e => e.StartTime).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.GameFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.GameFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Turn_Game_FK");
            });
        }
    }
}
