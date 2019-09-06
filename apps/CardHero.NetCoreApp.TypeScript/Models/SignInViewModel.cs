namespace CardHero.NetCoreApp.TypeScript.Models
{
    public class SignInViewModel
    {
        public string RedirectUri { get; set; }

        public string[] AllowedIdPs { get; set; }
    }
}
