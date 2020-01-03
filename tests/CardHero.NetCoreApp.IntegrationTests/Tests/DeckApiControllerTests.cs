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
    public class DeckApiControllerTests : IClassFixture<PostgreSqlWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public DeckApiControllerTests(PostgreSqlWebApplicationFactory<Startup> factory)
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

        [Fact]
        public async Task CreateAsync_ValidDeck_ReturnsNewDeck()
        {
            var deck = new DeckCreateModel
            {
                Description = "Test desc",
                Name = "Test name",
            };
            var client = _factory.CreateClientWithAuth();

            var response = await client.PostJsonAsync("api/decks", deck);
            response.EnsureSuccessStatusCode();

            var model = await response.Content.ReadAsAsync<DeckModel>();

            Assert.NotNull(model);
            Assert.True(model.Id > 0);
            Assert.Equal(deck.Description, model.Description);
            Assert.Equal(deck.Name, model.Name);
        }

        [Fact]
        public async Task FavouriteAsync_AddDeckFavourite_ReturnsOk()
        {
            var client = _factory.CreateClientWithAuth();

            var postModel = new DeckModel
            {
                IsFavourited = true,
            };
            var postResponse = await client.PostJsonAsync("api/decks/1/favourite", postModel);

            postResponse.EnsureSuccessStatusCode();

            var getResponse = await client.GetAsync("api/decks/1");
            var model = await getResponse.Content.ReadAsAsync<DeckModel>();

            Assert.Equal(1, model.Id);
            Assert.True(model.IsFavourited);
        }

        [Fact]
        public async Task PatchAsync_ValidCards_GetDeck()
        {
            var deck = new DeckModel
            {
                Cards = new DeckCardModel[]
                {
                    new DeckCardModel
                    {
                        CardCollectionId = 1
                    }
                }
            };
            var client = _factory.CreateClientWithAuth();

            var patchResponse = await client.PatchJsonAsync("api/decks/1", deck);

            patchResponse.EnsureSuccessStatusCode();

            var getResponse = await client.GetAsync("api/decks/1");
            var model = await getResponse.Content.ReadAsAsync<DeckModel>();

            Assert.NotNull(model);
            Assert.NotEmpty(model.Cards);
            Assert.Single(model.Cards);
            Assert.Equal(1, model.Cards.First().CardCollectionId);
        }
    }
}
