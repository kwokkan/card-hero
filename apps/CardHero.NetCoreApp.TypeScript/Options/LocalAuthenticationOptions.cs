using System.Collections.Generic;

namespace CardHero.NetCoreApp.TypeScript
{
    public class LocalAuthenticationOptions
    {
        public const string DefaultAuthenticationScheme = "Local";

        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public IEnumerable<string> Scopes { get; set; }

        public string SignInScheme { get; set; }
    }
}
