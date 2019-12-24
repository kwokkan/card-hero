using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class CardApiControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public CardApiControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAsync_NoFilters_ReturnsAll()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/cards");
            var model = await response.Content.ReadAsAsync<CardModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Equal(2, model.Length);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.NotNull(model.Single(x => x.Id == 2));
            Assert.Equal("First card", model.Single(x => x.Id == 1).Name);
            Assert.Equal("Second card", model.Single(x => x.Id == 2).Name);
        }

        [Fact]
        public async Task GetAsync_WithNameFilters_ReturnsSome()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/cards?name=First");
            var model = await response.Content.ReadAsAsync<CardModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Single(model);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.Equal("First card", model.Single(x => x.Id == 1).Name);
        }
    }
}
