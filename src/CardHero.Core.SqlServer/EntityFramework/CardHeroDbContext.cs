using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardHeroDbContext : DbContext
    {
        public virtual DbSet<Card> Card { get; set; }
        public virtual DbSet<CardCollection> CardCollection { get; set; }
        public virtual DbSet<CardFavourite> CardFavourite { get; set; }
        public virtual DbSet<Deck> Deck { get; set; }
        public virtual DbSet<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual DbSet<DeckFavourite> DeckFavourite { get; set; }
        public virtual DbSet<Move> Move { get; set; }
        public virtual DbSet<Rarity> Rarity { get; set; }
        public virtual DbSet<StoreItem> StoreItem { get; set; }
        public virtual DbSet<Turn> Turn { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

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
                    .IsRowVersion();

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
                    .IsRowVersion();

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

            modelBuilder.Entity<CardFavourite>(entity =>
            {
                entity.HasKey(e => e.CardFavouritePk);

                entity.HasIndex(e => new { e.CardFk, e.UserFk })
                    .HasName("UX_CardFavourite_Card_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.CardFavouritePk).HasColumnName("CardFavourite_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.CardFkNavigation)
                    .WithMany(p => p.CardFavourite)
                    .HasForeignKey(d => d.CardFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CardFavourite_Card_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.CardFavourite)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CardFavourite_User_FK");
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

                entity.Property(e => e.Rowstamp).IsRowVersion();

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

                entity.Property(e => e.Rowstamp).IsRowVersion();

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

            modelBuilder.Entity<DeckFavourite>(entity =>
            {
                entity.HasKey(e => e.DeckFavouritePk);

                entity.HasIndex(e => new { e.DeckFk, e.UserFk })
                    .HasName("UX_DeckFavourite_Deck_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.DeckFavouritePk).HasColumnName("DeckFavourite_PK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.UserFk).HasColumnName("User_FK");

                entity.HasOne(d => d.DeckFkNavigation)
                    .WithMany(p => p.DeckFavourite)
                    .HasForeignKey(d => d.DeckFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeckFavourite_Deck_FK");

                entity.HasOne(d => d.UserFkNavigation)
                    .WithMany(p => p.DeckFavourite)
                    .HasForeignKey(d => d.UserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DeckFavourite_User_FK");
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

                entity.HasOne(d => d.CardCollectionFkNavigation)
                    .WithMany(p => p.Move)
                    .HasForeignKey(d => d.CardCollectionFk)
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
                    .IsRowVersion();
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
                    .IsRowVersion();
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

                entity.HasOne(d => d.CurrentUserFkNavigation)
                    .WithMany(p => p.Turn)
                    .HasForeignKey(d => d.CurrentUserFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Turn_CurrentUser_FK");
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
        }
    }
}
