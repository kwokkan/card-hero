using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GameApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory>, IClassFixture<SqlServerWebApplicationFactory>
    {
        public GameApiControllerTests(PostgreSqlWebApplicationFactory postgresApplicationFactory, SqlServerWebApplicationFactory sqlServerApplicationFactory)
            : base(postgresApplicationFactory, sqlServerApplicationFactory)
        {
        }
    }
}
