using Microsoft.EntityFrameworkCore;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardHeroDbContext : DbContext
    {
        public virtual DbSet<CardFavourite> CardFavourite { get; set; }
        public virtual DbSet<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual DbSet<DeckFavourite> DeckFavourite { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<CardFavourite>(entity =>
            {
                entity.HasKey(e => e.CardFavouritePk);

                entity.HasIndex(e => new { e.CardFk, e.UserFk })
                    .HasName("UX_CardFavourite_Card_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.CardFavouritePk).HasColumnName("CardFavourite_PK");

                entity.Property(e => e.CardFk).HasColumnName("Card_FK");

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
            });
        }
    }
}
