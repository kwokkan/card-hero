using System.Collections.Generic;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GitHubAuthenticationOptions
    {
        public const string DefaultAuthenticationScheme = "GitHub";
        public const string DefaultDisplayName = "GitHub";

        public const string DefaultAuthorizationEndpoint = "https://github.com/login/oauth/authorize";
        public const string DefaultTokenEndpoint = "https://github.com/login/oauth/access_token";
        public const string DefaultUserInformationEndpoint = "https://api.github.com/user";
        public const string DefaultClaimsIssuer = "OAuth2-GitHub";

        public string AuthorizationEndpoint { get; set; } = DefaultAuthorizationEndpoint;
        public string TokenEndpoint { get; set; } = DefaultTokenEndpoint;
        public string UserInformationEndpoint { get; set; } = DefaultUserInformationEndpoint;

        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public ISet<string> Scopes { get; set; }

        public string SignInScheme { get; set; }
    }
}
