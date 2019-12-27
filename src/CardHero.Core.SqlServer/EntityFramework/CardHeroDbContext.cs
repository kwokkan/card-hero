using Microsoft.EntityFrameworkCore;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardHeroDbContext : DbContext
    {
        public virtual DbSet<DeckFavourite> DeckFavourite { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<DeckFavourite>(entity =>
            {
                entity.HasKey(e => e.DeckFavouritePk);

                entity.HasIndex(e => new { e.DeckFk, e.UserFk })
                    .HasName("UX_DeckFavourite_Deck_FK_User_FK")
                    .IsUnique();

                entity.Property(e => e.DeckFavouritePk).HasColumnName("DeckFavourite_PK");

                entity.Property(e => e.DeckFk).HasColumnName("Deck_FK");

                entity.Property(e => e.UserFk).HasColumnName("User_FK");
            });
        }
    }
}
