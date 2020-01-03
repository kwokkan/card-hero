using System.Net;
using System.Threading.Tasks;

using AngleSharp;

using CardHero.NetCoreApp.TypeScript;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public class TopLevelControllerTests : IntegrationTestBase, IClassFixture<PostgreSqlWebApplicationFactory<Startup>>, IClassFixture<SqlServerWebApplicationFactory<Startup>>
    {
        public TopLevelControllerTests(
            PostgreSqlWebApplicationFactory<Startup> postgreSqlFactory,
            SqlServerWebApplicationFactory<Startup> sqlServerFactory
        ) : base(postgreSqlFactory, sqlServerFactory)
        {
        }

        [Theory]
        [InlineData("/", "Home")]
        [InlineData("/Card", "Cards")]
        [InlineData("/Game", "Games")]
        [InlineData("/Store", "Store")]
        public async Task GetTopLevelView_WithoutAuthorization_ReturnsSuccess(string path, string title)
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync(path);

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();

                var context = BrowsingContext.New(Configuration.Default);
                var document = await context.OpenAsync(req => req.Content(content));

                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
                Assert.Equal(title + " - CardHero.NetCoreApp.TypeScript", document.Title);
            });
        }

        [Theory]
        [InlineData("/Collection")]
        [InlineData("/Deck")]
        public async Task GetTopLevelView_WithoutAuthorization_ReturnsUnauthorized(string path)
        {
            await RunAsync(async factory =>
            {
                var client = factory.CreateClient();

                var response = await client.GetAsync(path);

                var content = await response.Content.ReadAsStringAsync();

                var context = BrowsingContext.New(Configuration.Default);
                var document = await context.OpenAsync(req => req.Content(content));

                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
                Assert.Equal("Sign In - CardHero.NetCoreApp.TypeScript", document.Title);
                Assert.Equal("/SignIn", response.RequestMessage.RequestUri.AbsolutePath);
            });
        }
    }
}
