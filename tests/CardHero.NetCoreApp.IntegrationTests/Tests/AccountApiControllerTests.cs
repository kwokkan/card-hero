using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class AccountApiControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public AccountApiControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAsync_WithoutLogin_ReturnsUnauthorized()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("api/account");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetAsync_ValidUser()
        {
            var client = _factory.CreateClientWithAuth();

            var response = await client.GetAsync("api/account");
            var model = await response.Content.ReadAsAsync<UserModel>();

            response.EnsureSuccessStatusCode();

            Assert.NotNull(model);
            Assert.Equal("Test user", model.FullName);
            Assert.Equal(123456, model.Coins);
        }
    }
}
