using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class CardPackApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory>, IClassFixture<SqlServerWebApplicationFactory>
    {
        public CardPackApiControllerTests(PostgreSqlWebApplicationFactory postgresAplicationFactory, SqlServerWebApplicationFactory sqlServerAplicationFactory)
            : base(postgresAplicationFactory, sqlServerAplicationFactory)
        {
        }

        [Fact]
        public async Task GetAsync_NoFilters_ReturnsAll()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync("api/packs");
                var model = await response.Content.ReadAsAsync<CardPackModel[]>();

                response.EnsureSuccessStatusCode();

                Assert.Equal(2, model.Length);
                Assert.NotNull(model.Single(x => x.Id == 600));
                Assert.NotNull(model.Single(x => x.Id == 601));
                Assert.Equal("First pack", model.Single(x => x.Id == 600).Name);
                Assert.Equal("Second pack", model.Single(x => x.Id == 601).Name);
            });
        }
    }
}
