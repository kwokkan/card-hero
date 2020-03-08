using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GamePlayApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory>, IClassFixture<SqlServerWebApplicationFactory>
    {
        public GamePlayApiControllerTests(PostgreSqlWebApplicationFactory postgresApplicationFactory, SqlServerWebApplicationFactory sqlServerApplicationFactory)
            : base(postgresApplicationFactory, sqlServerApplicationFactory)
        {
        }

    }
}
