using Microsoft.EntityFrameworkCore;

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
        public virtual DbSet<Rarity> Rarity { get; set; }

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
        }
    }
}
