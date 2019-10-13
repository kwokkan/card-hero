using System;

using CardHero.AspNetCore.Authentication.FileSystem;

using Microsoft.AspNetCore.Authentication.Cookies;

namespace Microsoft.Extensions.Logging
{
    internal static class JsonFileSystemTicketStoreLoggerExtensions
    {
        private const LogLevel DefaultLogLevel = LogLevel.Information;

        private static readonly Action<ILogger<JsonFileSystemTicketStore>, string, Exception> _removeLogger = LoggerMessage.Define<string>(
            DefaultLogLevel,
            new EventId(1, nameof(ITicketStore.RemoveAsync)),
            "Removing session: {Key}"
        );

        private static readonly Action<ILogger<JsonFileSystemTicketStore>, string, Exception> _renewLogger = LoggerMessage.Define<string>(
            DefaultLogLevel,
            new EventId(2, nameof(ITicketStore.RenewAsync)),
            "Renewing session: {Key}"
        );

        private static readonly Action<ILogger<JsonFileSystemTicketStore>, string, Exception> _retrieveLogger = LoggerMessage.Define<string>(
            DefaultLogLevel,
            new EventId(3, nameof(ITicketStore.RetrieveAsync)),
            "Retrieving session: {Key}"
        );

        private static readonly Action<ILogger<JsonFileSystemTicketStore>, string, Exception> _storeLogger = LoggerMessage.Define<string>(
            DefaultLogLevel,
            new EventId(4, nameof(ITicketStore.StoreAsync)),
            "Storing session: {Key}"
        );

        public static void LoggerRemove(this ILogger<JsonFileSystemTicketStore> logger, string key)
        {
            _removeLogger(logger, key, null);
        }

        public static void LoggerRenew(this ILogger<JsonFileSystemTicketStore> logger, string key)
        {
            _renewLogger(logger, key, null);
        }

        public static void LoggerRetrieveove(this ILogger<JsonFileSystemTicketStore> logger, string key)
        {
            _retrieveLogger(logger, key, null);
        }

        public static void LoggerStore(this ILogger<JsonFileSystemTicketStore> logger, string key)
        {
            _storeLogger(logger, key, null);
        }
    }
}
