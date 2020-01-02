using System;

using Npgsql;

namespace CardHero.Data.PostgreSql.DependencyInjection
{
    internal class ConnectionStringParser
    {
        /// <summary>
        /// Parse a connection string.
        /// </summary>
        /// <remarks>
        /// This can be a normal connection string or a url connection string.
        ///
        /// Normal - host=localhost;port=5432;username=username;password=password;database=database
        ///
        /// Url - postgres://username:password@localhost:5432/database
        /// </remarks>
        /// <param name="connectionString">The connection string.</param>
        /// <returns></returns>
        public string Parse(string connectionString)
        {
            var builder = new NpgsqlConnectionStringBuilder();

            if (Uri.TryCreate(connectionString, UriKind.Absolute, out var connectionUri))
            {
                var userinfo = connectionUri.UserInfo?.Split(':');

                builder.Host = connectionUri.Host;
                builder.Port = connectionUri.Port;

                builder.Username = userinfo?[0];
                builder.Passfile = userinfo?[1];

                builder.Database = connectionUri.LocalPath?.TrimStart('/');

                // Heroku requires ssl mode
                builder.SslMode = SslMode.Require;
            }
            else
            {
                builder.ConnectionString = connectionString;
            }

            return builder.ConnectionString;
        }
    }
}
