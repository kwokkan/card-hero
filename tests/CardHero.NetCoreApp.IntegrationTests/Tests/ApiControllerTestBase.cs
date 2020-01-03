using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class ApiControllerTestBase
    {
        private readonly List<WebApplicationFactory<Startup>> _factories = new List<WebApplicationFactory<Startup>>();

        public ApiControllerTestBase(CustomWebApplicationFactory<Startup> factory)
        {
            _factories.Add(factory);
        }

        protected async Task RunAsync(Func<WebApplicationFactory<Startup>, Task> action)
        {
            foreach (var factory in _factories)
            {
                await action(factory);
            }
        }
    }
}
