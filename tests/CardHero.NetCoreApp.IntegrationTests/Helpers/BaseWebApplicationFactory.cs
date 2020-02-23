using System;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class BaseWebApplicationFactory : WebApplicationFactory<Startup>
    {
        protected string Id { get; } = Guid.NewGuid().ToString();

        public virtual Task AddDataAsync(params GameData[] data)
        {
            return Task.CompletedTask;
        }

        public virtual Task AddDataAsync(params GameDeckCardCollectionData[] data)
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

        public virtual Task AddDataAsync(params MoveData[] data)
        {
            return Task.CompletedTask;
        }

        public virtual Task AddDataAsync(params TurnData[] data)
        {
            return Task.CompletedTask;
        }

        public virtual Task ResetDataAsync()
        {
            return Task.CompletedTask;
        }
    }
}
