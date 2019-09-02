using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;

using Newtonsoft.Json.Linq;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class GitHubAuthenticationBuilderExtensions
    {
        public static AuthenticationBuilder AddGitHubAuthentication(this AuthenticationBuilder authenticationBuilder, GitHubAuthenticationOptions options)
        {
            authenticationBuilder.AddOAuth(GitHubAuthenticationOptions.DefaultAuthenticationScheme, GitHubAuthenticationOptions.DefaultDisplayName, x =>
            {
                x.CallbackPath = new AspNetCore.Http.PathString("/signin-github");

                x.ClientId = options.ClientId;
                x.ClientSecret = options.ClientSecret;

                x.AuthorizationEndpoint = options.AuthorizationEndpoint;
                x.TokenEndpoint = options.TokenEndpoint;
                x.UserInformationEndpoint = options.UserInformationEndpoint;

                x.ClaimsIssuer = GitHubAuthenticationOptions.DefaultClaimsIssuer;

                x.Events = new OAuthEvents
                {
                    OnCreatingTicket = async context =>
                    {
                        var request = new HttpRequestMessage(HttpMethod.Get, options.UserInformationEndpoint);
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

                        var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                        if (!response.IsSuccessStatusCode)
                        {
                            return;
                        }

                        var content = await response.Content.ReadAsStringAsync();
                        var payload = JObject.Parse(content);

                        var githubId = payload.GetValue("id")?.ToObject<int>();

                        if (githubId.HasValue && githubId > 0)
                        {
                            var nameValue = payload.GetValue("name")?.ToObject<string>() ?? payload.GetValue("login")?.ToObject<string>() ?? "GitHub User #" + githubId;
                            context.Identity.AddClaim(new Claim("sub", githubId.ToString()));
                            context.Identity.AddClaim(new Claim("idp", GitHubAuthenticationOptions.DefaultAuthenticationScheme));
                            context.Identity.AddClaim(new Claim("name", nameValue));
                        }
                    },
                    OnRedirectToAuthorizationEndpoint = context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api"))
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            context.Response.Redirect(context.RedirectUri);
                        }

                        return Task.CompletedTask;
                    }
                };

                if (options.Scopes != null)
                {
                    foreach (var scope in options.Scopes)
                    {
                        x.Scope.Add(scope);
                    }
                }

                if (options.SignInScheme != null)
                {
                    x.SignInScheme = options.SignInScheme;
                }
            });

            return authenticationBuilder;
        }
    }
}
