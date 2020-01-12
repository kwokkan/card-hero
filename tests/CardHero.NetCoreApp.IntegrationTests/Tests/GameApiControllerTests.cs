using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public partial class GameApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory>, IClassFixture<SqlServerWebApplicationFactory>
    {
        public GameApiControllerTests(PostgreSqlWebApplicationFactory postgresAplicationFactory, SqlServerWebApplicationFactory sqlServerAplicationFactory)
            : base(postgresAplicationFactory, sqlServerAplicationFactory)
        {
        }

    }
}
