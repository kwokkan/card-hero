using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class StoreApiControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory<Startup>>, IClassFixture<SqlServerWebApplicationFactory<Startup>>
    {
        public StoreApiControllerTests(
            PostgreSqlWebApplicationFactory<Startup> postgreSqlFactory,
            SqlServerWebApplicationFactory<Startup> sqlServerFactory
        ) : base(postgreSqlFactory, sqlServerFactory)
        {
        }

        [Fact]
        public async Task GetAsync_ExcludesInvalidBundles()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync("api/store");
                var model = await response.Content.ReadAsAsync<StoreItemModel[]>();

                response.EnsureSuccessStatusCode();

                Assert.Equal(2, model.Length);
                Assert.NotNull(model.Single(x => x.Id == 501));
                Assert.NotNull(model.Single(x => x.Id == 503));
                Assert.Equal(1, model.Single(x => x.Id == 501).ItemCount);
                Assert.Equal(3, model.Single(x => x.Id == 503).ItemCount);
            });
        }

        [Fact]
        public async Task BuyStoreItemAsync_CardPackBundleOnly()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.PostJsonAsync("api/store", new StoreItemModel
                {
                    Id = 501,
                });
                response.EnsureSuccessStatusCode();
                var model = await response.Content.ReadAsAsync<CardCollectionModel[]>();

                Assert.Single(model);
                Assert.Equal(2, model.First().CardId);
            });
        }
    }
}
