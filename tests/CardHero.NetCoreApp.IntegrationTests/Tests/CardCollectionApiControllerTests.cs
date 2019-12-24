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
    public class CardCollectionApiControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public CardCollectionApiControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAsync_Unauthorized()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/collections");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetAsync_NoFilters_ReturnsAll()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/collections");
            var model = await response.Content.ReadAsAsync<CardCollectionModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Equal(2, model.Length);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.NotNull(model.Single(x => x.Id == 2));
            Assert.Equal("First card", model.Single(x => x.Id == 1).Card.Name);
            Assert.Equal("Second card", model.Single(x => x.Id == 2).Card.Name);
        }

        [Fact]
        public async Task GetAsync_WithNameFilters_ReturnsSome()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/collections?name=First");
            var model = await response.Content.ReadAsAsync<CardCollectionModel[]>();

            response.EnsureSuccessStatusCode();

            Assert.Single(model);
            Assert.NotNull(model.Single(x => x.Id == 1));
            Assert.Equal("First card", model.Single(x => x.Id == 1).Card.Name);
        }
    }
}
