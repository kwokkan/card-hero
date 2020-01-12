using System;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;

using Microsoft.AspNetCore.Mvc.Testing;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class BaseWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup>
        where TStartup : class
    {
        protected string Id { get; } = Guid.NewGuid().ToString();

        public virtual Task AddDataAsync(params GameData[] data)
        {
            return Task.CompletedTask;
        }

        public virtual Task AddDataAsync(params GameDeckData[] data)
        {
            return Task.CompletedTask;
        }

        public virtual Task AddDataAsync(params GameUserData[] data)
        {
            return Task.CompletedTask;
        }
    }
}
