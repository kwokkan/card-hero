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

        public virtual DbSet<Move> Move { get; set; }
        public virtual DbSet<Turn> Turn { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

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
            });
        }
    }
}
