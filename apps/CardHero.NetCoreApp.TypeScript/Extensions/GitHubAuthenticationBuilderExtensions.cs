using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;
using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.AspNetCore.Builder
{
    public static class GitHubAuthenticationBuilderExtensions
    {
        private static readonly JsonSerializerOptions _options = new JsonSerializerOptions
        {
            AllowTrailingCommas = true,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
            PropertyNameCaseInsensitive = true,
            ReadCommentHandling = JsonCommentHandling.Skip,
        };

        private static OAuthEvents GetOAuthEvents(string userInformationEndpoint)
        {
            return new OAuthEvents
            {
                OnCreatingTicket = async context =>
                {
                    using (var request = new HttpRequestMessage(HttpMethod.Get, userInformationEndpoint))
                    {
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

                        var response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                        if (!response.IsSuccessStatusCode)
                        {
                            return;
                        }

                        var content = await response.Content.ReadAsStringAsync();

                        var payload = JsonSerializer.Deserialize<GithubUserInformationModel>(content, _options);

                        var githubId = payload.Id;

                        if (githubId.HasValue && githubId > 0)
                        {
                            var nameValue = payload.Name ?? payload.Login ?? "GitHub User #" + githubId;
                            context.Identity.AddClaim(new Claim("sub", githubId.ToString()));
                            context.Identity.AddClaim(new Claim("idp", GitHubAuthenticationOptions.DefaultAuthenticationScheme));
                            context.Identity.AddClaim(new Claim("name", nameValue));
                        }
                    }
                },
                OnRedirectToAuthorizationEndpoint = context =>
                {
                    if (context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase))
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    }
                    else
                    {
                        context.Response.Redirect(context.RedirectUri);
                    }

                    return Task.CompletedTask;
                },
            };
        }

        public static AuthenticationBuilder AddGitHubAuthentication(this AuthenticationBuilder authenticationBuilder, GitHubAuthenticationOptions options)
        {
            authenticationBuilder.AddOAuth(GitHubAuthenticationOptions.DefaultAuthenticationScheme, GitHubAuthenticationOptions.DefaultDisplayName, x =>
            {
                x.CallbackPath = new Http.PathString("/signin-github");

                x.ClientId = options.ClientId;
                x.ClientSecret = options.ClientSecret;

                x.CorrelationCookie.Name = ".ch.";
                x.CorrelationCookie.SameSite = Http.SameSiteMode.Lax;

                x.AuthorizationEndpoint = options.AuthorizationEndpoint;
                x.TokenEndpoint = options.TokenEndpoint;
                x.UserInformationEndpoint = options.UserInformationEndpoint;

                x.ClaimsIssuer = GitHubAuthenticationOptions.DefaultClaimsIssuer;

                x.Events = GetOAuthEvents(options.UserInformationEndpoint);

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
