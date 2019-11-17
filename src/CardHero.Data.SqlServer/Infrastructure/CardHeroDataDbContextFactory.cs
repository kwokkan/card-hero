using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public class CardHeroDataDbContextFactory : ICardHeroDataDbContextFactory
    {
        private readonly CardHeroDataDbOptions _options;

        public CardHeroDataDbContextFactory(CardHeroDataDbOptions options)
        {
            _options = options;
        }

        CardHeroDataDbContext ICardHeroDataDbContextFactory.Create(bool trackChanges)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CardHeroDataDbContext>();
            optionsBuilder.UseSqlServer(_options.ConnectionString);

            var context = new CardHeroDataDbContext(optionsBuilder.Options);

            if (!trackChanges)
            {
                context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            }

            return context;
        }
    }
}
