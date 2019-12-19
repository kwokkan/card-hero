using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class DeckApiControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public DeckApiControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAsync_Unauthorized()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/decks");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetAsync_NoFilters_ReturnsAll()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/decks");
            var model = await response.Content.ReadAsAsync<DeckModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Equal(2, model.Length);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.NotNull(model.Single(x => x.Id == 2));
            Assert.Equal("First deck", model.Single(x => x.Id == 1).Name);
            Assert.Equal("Second deck", model.Single(x => x.Id == 2).Name);
        }

        [Fact]
        public async Task GetAsync_WithNameFilters_ReturnsSome()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/decks?name=First");
            var model = await response.Content.ReadAsAsync<DeckModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Single(model);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.Equal("First deck", model.Single(x => x.Id == 1).Name);
        }
    }
}
