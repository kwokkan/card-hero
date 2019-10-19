using System.Collections.Generic;

namespace CardHero.AspNetCore.Authentication.FileSystem
{
    internal class CardHeroAuthenticationTicketModel
    {
        public string AuthenticationScheme { get; set; }

        public string AuthenticationType { get; set; }

        public string ClaimNameType { get; set; }

        public string ClaimRoleType { get; set; }

        public IDictionary<string, string> AuthenticationPropertiesItems { get; set; }

        public IDictionary<string, object> AuthenticationPropertiesParameters { get; set; }

        public IDictionary<string, string> Claims { get; set; }
    }
}
