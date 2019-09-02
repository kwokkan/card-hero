using Microsoft.EntityFrameworkCore;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardHeroDbContext
	{
		public CardHeroDbContext()
			: base()
		{
		}

		public CardHeroDbContext(DbContextOptions<CardHeroDbContext> options)
			: base(options)
		{
		}
	}
}
