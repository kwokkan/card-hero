using Npgsql;

namespace CardHero.Data.PostgreSql.DependencyInjection
{
    internal class ConnectionOptions
    {
        public SslMode SslMode { get; set; } = SslMode.Prefer;

        public bool TrustServerCertificate { get; set; }
    }
}
