using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    public class TokenController : BaseController
    {
        public virtual async Task<IActionResult> AuthorizeAsync()
        {
            var httpClient = new HttpClient();

            var tokenRequest = new ClientCredentialsTokenRequest
            {
                Address = "http://localhost:4433/connect/token",
                ClientId = "TripleTriadWebClient",
                ClientSecret = "TripleTriadWebClientSecret",
                Scope = "AccessTripleTriad",
            };

            var tokenResponse = await httpClient.RequestClientCredentialsTokenAsync(tokenRequest);

            return Json(tokenResponse);
        }
    }
}
