﻿using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class AccountApiControllerTests : ApiControllerTestBase, IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        public AccountApiControllerTests(CustomWebApplicationFactory<Startup> factory)
            : base(factory)
        {
        }

        [Fact]
        public async Task GetAsync_WithoutLogin_ReturnsUnauthorizedAsync()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync("api/account");

                Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            });
        }

        [Fact]
        public async Task GetAsync_ValidUser()
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClientWithAuth();

                var response = await client.GetAsync("api/account");
                var model = await response.Content.ReadAsAsync<UserModel>();

                response.EnsureSuccessStatusCode();

                Assert.NotNull(model);
                Assert.Equal("Test user", model.FullName);
                Assert.Equal(123456, model.Coins);
            });
        }
    }
}
