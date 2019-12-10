﻿using System.Net;
using System.Threading.Tasks;

using AngleSharp;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class TopLevelControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public TopLevelControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Theory]
        [InlineData("/", "Home")]
        [InlineData("/Card", "Cards")]
        [InlineData("/Game", "Games")]
        [InlineData("/Store", "Store")]
        public async Task GetTopLevelView_WithoutAuthorization_ReturnsSuccess(string path, string title)
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync(path);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            var context = BrowsingContext.New(Configuration.Default);
            var document = await context.OpenAsync(req => req.Content(content));

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal(title + " - CardHero.NetCoreApp.TypeScript", document.Title);
        }

        [Theory]
        [InlineData("/Collection")]
        [InlineData("/Deck")]
        public async Task GetTopLevelView_WithoutAuthorization_ReturnsUnauthorized(string path)
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync(path);

            var content = await response.Content.ReadAsStringAsync();

            var context = BrowsingContext.New(Configuration.Default);
            var document = await context.OpenAsync(req => req.Content(content));

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Sign In - CardHero.NetCoreApp.TypeScript", document.Title);
            Assert.Equal("/SignIn", response.RequestMessage.RequestUri.AbsolutePath);
        }
    }
}
