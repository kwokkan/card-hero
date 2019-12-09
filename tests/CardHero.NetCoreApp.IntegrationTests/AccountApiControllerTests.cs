using System.Net;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class AccountApiControllerTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public AccountApiControllerTests(WebApplicationFactory<Startup> factory)
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
    }
}
