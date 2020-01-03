using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class CardCollectionApiControllerTests : ApiControllerTestBase, IClassFixture<PostgreSqlWebApplicationFactory<Startup>>, IClassFixture<SqlServerWebApplicationFactory<Startup>>
    {
        public CardCollectionApiControllerTests(
            PostgreSqlWebApplicationFactory<Startup> postgreSqlFactory,
            SqlServerWebApplicationFactory<Startup> sqlServerFactory
        ) : base(postgreSqlFactory, sqlServerFactory)
        {
        }

        [Fact]
        public async Task GetAsync_Unauthorized()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync("api/collections");

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }

        [Fact]
        public async Task GetAsync_NoFilters_ReturnsAll()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.GetAsync("api/collections");
                var model = await response.Content.ReadAsAsync<CardCollectionModel[]>();

                response.EnsureSuccessStatusCode();

                Assert.Equal(2, model.Length);
                Assert.NotNull(model.Single(x => x.Id == 1));
                Assert.NotNull(model.Single(x => x.Id == 2));
                Assert.Equal("First card", model.Single(x => x.Id == 1).Card.Name);
                Assert.Equal("Second card", model.Single(x => x.Id == 2).Card.Name);
            });
        }

        [Fact]
        public async Task GetAsync_WithNameFilters_ReturnsSome()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.GetAsync("api/collections?name=First");
                var model = await response.Content.ReadAsAsync<CardCollectionModel[]>();

                response.EnsureSuccessStatusCode();

                Assert.Single(model);
                Assert.NotNull(model.Single(x => x.Id == 1));
                Assert.Equal("First card", model.Single(x => x.Id == 1).Card.Name);
            });
        }
    }
}
