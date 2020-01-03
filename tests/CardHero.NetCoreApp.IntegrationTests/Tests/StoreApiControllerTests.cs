using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class StoreApiControllerTests : IClassFixture<PostgreSqlWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public StoreApiControllerTests(PostgreSqlWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAsync_ExcludesInvalidBundles()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/store");
            var model = await response.Content.ReadAsAsync<StoreItemModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Equal(2, model.Length);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.NotNull(model.Single(x => x.Id == 3));
            Assert.Equal(1, model.Single(x => x.Id == 1).ItemCount);
            Assert.Equal(3, model.Single(x => x.Id == 3).ItemCount);
        }
    }
}
