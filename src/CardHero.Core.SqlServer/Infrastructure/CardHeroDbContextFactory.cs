using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Options;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public class CardHeroDbContextFactory : IDesignTimeDbContextFactory<CardHeroDbContext>
    {
        private readonly CardHeroOptions _options;

        public CardHeroDbContextFactory(IOptions<CardHeroOptions> options)
        {
            _options = options.Value;
        }

        public CardHeroDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CardHeroDbContext>();
            optionsBuilder.UseSqlServer(_options.ConnectionString);

            return new CardHeroDbContext(optionsBuilder.Options);
        }
    }
}
