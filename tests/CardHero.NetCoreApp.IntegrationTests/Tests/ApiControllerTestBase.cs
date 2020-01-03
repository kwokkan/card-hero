using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Microsoft.AspNetCore.Mvc.Testing;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class ApiControllerTestBase
    {
        private readonly List<WebApplicationFactory<Startup>> _factories = new List<WebApplicationFactory<Startup>>();

        public ApiControllerTestBase(
            PostgreSqlWebApplicationFactory<Startup> postgreSqlFactory,
            SqlServerWebApplicationFactory<Startup> sqlServerFactory
        )
        {
            _factories.Add(postgreSqlFactory);
            _factories.Add(sqlServerFactory);
        }

        protected async Task RunAsync(Func<WebApplicationFactory<Startup>, Task> action, [CallerMemberName]string callerMemberName = "")
        {
            foreach (var factory in _factories)
            {
                try
                {
                    await action(factory);
                }
                catch (Exception e)
                {
                    throw new Exception(factory.ToString() + " - " + callerMemberName, e);
                }
            }
        }
    }
}
