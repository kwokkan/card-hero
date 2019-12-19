using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Logging;

namespace CardHero.AspNetCore.Authentication.FileSystem
{
    /// <summary>
    /// Ticket store using JSON files on the file system.
    /// Useful for debugging and seeing what's in the session but not recommended for production use as the session is stored unencrypte.
    /// </summary>
    public class JsonFileSystemTicketStore : ITicketStore
    {
        private static readonly JsonSerializerOptions _jsonSerializerOptions = new JsonSerializerOptions
        {
            AllowTrailingCommas = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            ReadCommentHandling = JsonCommentHandling.Skip,
            WriteIndented = true,
        };

        private readonly ILogger<JsonFileSystemTicketStore> _logger;
        private readonly string _baseDirectory;

        public JsonFileSystemTicketStore(ILogger<JsonFileSystemTicketStore> logger, FileSystemTicketStoreOptions options)
        {
            _logger = logger;

            _baseDirectory = options.BaseDirectory;
        }

        Task ITicketStore.RemoveAsync(string key)
        {
            _logger.LoggerRemove(key);

            var path = GetPath(key);
            if (File.Exists(path))
            {
                File.Delete(path);
            }

            return Task.CompletedTask;
        }

        async Task ITicketStore.RenewAsync(string key, AuthenticationTicket ticket)
        {
            _logger.LoggerRenew(key);

            await SaveAuthenticationTicketAsync(key, ticket);
        }

        async Task<AuthenticationTicket> ITicketStore.RetrieveAsync(string key)
        {
            _logger.LoggerRetrieveove(key);

            var path = GetPath(key);

            if (File.Exists(path))
            {
                CardHeroAuthenticationTicketModel model;
                using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    model = await JsonSerializer.DeserializeAsync<CardHeroAuthenticationTicketModel>(fs, options: _jsonSerializerOptions);
                }

                var claims = model.Claims.Select(x => new Claim(x.Key, x.Value)).ToArray();
                var identity = new ClaimsIdentity(claims, model.AuthenticationType, model.ClaimNameType, model.ClaimRoleType);
                var principal = new ClaimsPrincipal(identity);
                var properties = new AuthenticationProperties(model.AuthenticationPropertiesItems, model.AuthenticationPropertiesParameters);
                var ticket = new AuthenticationTicket(principal, properties, model.AuthenticationScheme);

                return ticket;
            }

            return null;
        }

        async Task<string> ITicketStore.StoreAsync(AuthenticationTicket ticket)
        {
            var key = Guid.NewGuid().ToString();

            _logger.LoggerStore(key);

            await SaveAuthenticationTicketAsync(key, ticket);

            return key;
        }

        private string GetPath(string key)
        {
            return Path.Combine(_baseDirectory, key + ".json");
        }

        private async Task SaveAuthenticationTicketAsync(string key, AuthenticationTicket ticket)
        {
            var path = GetPath(key);
            var identity = ticket.Principal.Identity as ClaimsIdentity;
            var model = new CardHeroAuthenticationTicketModel
            {
                AuthenticationScheme = ticket.AuthenticationScheme,
                AuthenticationPropertiesItems = ticket.Properties.Items,
                AuthenticationPropertiesParameters = ticket.Properties.Parameters,

                AuthenticationType = identity?.AuthenticationType,
                ClaimNameType = identity?.NameClaimType,
                ClaimRoleType = identity?.RoleClaimType,

                Claims = ticket.Principal.Claims.ToDictionary(x => x.Type, x => x.Value),
            };

            using (var fs = new FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                await JsonSerializer.SerializeAsync(fs, model, options: _jsonSerializerOptions);
            }
        }
    }
}
