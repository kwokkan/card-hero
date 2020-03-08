using System;
using System.Net;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.AspNetCore.Builder
{
    public static class LocalAuthenticationBuilderExtensions
    {
        public static AuthenticationBuilder AddLocalAuthentication(this AuthenticationBuilder authenticationBuilder, LocalAuthenticationOptions options)
        {
            authenticationBuilder
                .AddOpenIdConnect(LocalAuthenticationOptions.DefaultAuthenticationScheme, x =>
                {
                    x.Authority = options.Authority;
                    x.ClientId = options.ClientId;
                    x.ClientSecret = options.ClientSecret;
                    x.Events = new Authentication.OpenIdConnect.OpenIdConnectEvents
                    {
                        OnRedirectToIdentityProvider = (context) =>
                        {
                            if (context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase))
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                return Task.CompletedTask;
                            }

                            return Task.CompletedTask;
                        },
                    };
                    x.GetClaimsFromUserInfoEndpoint = true;
                    x.ResponseType = "code id_token token";
                    x.SignInScheme = options.SignInScheme;
                    x.TokenValidationParameters = new IdentityModel.Tokens.TokenValidationParameters
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role",
                    };

                    if (options.Scopes != null)
                    {
                        foreach (var scope in options.Scopes)
                        {
                            x.Scope.Add(scope);
                        }
                    }
                });

            return authenticationBuilder;
        }
    }
}
