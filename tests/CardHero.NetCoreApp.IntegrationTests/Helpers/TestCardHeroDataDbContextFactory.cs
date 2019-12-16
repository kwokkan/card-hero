using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class TestCardHeroDataDbContextFactory : ICardHeroDataDbContextFactory
    {
        private readonly CardHeroDataDbContext _context;

        public TestCardHeroDataDbContextFactory(CardHeroDataDbContext context)
        {
            _context = context;
        }

        CardHeroDataDbContext ICardHeroDataDbContextFactory.Create(bool trackChanges)
        {
            return _context;
        }
    }
}
