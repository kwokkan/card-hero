using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class IntegrationTestBase
    {
        protected const int IdCard = 100;
        protected const int IdDeck = 400;
        protected const int IdGame = 700;
        protected const int IdCardCollection = 900;

        private readonly List<BaseWebApplicationFactory> _factories = new List<BaseWebApplicationFactory>();

        public IntegrationTestBase(PostgreSqlWebApplicationFactory postgresApplicationFactory, SqlServerWebApplicationFactory sqlServerApplicationFactory)
        {
            _factories.Add(postgresApplicationFactory);
            _factories.Add(sqlServerApplicationFactory);
        }

        protected async Task RunAsync(Func<BaseWebApplicationFactory, Task> action, [CallerMemberName]string callerMemberName = "")
        {
            var failed = new List<string>(_factories.Count);

            foreach (var factory in _factories)
            {
                await factory.ResetDataAsync();

                try
                {
                    await action(factory);
                }
                catch (Exception e)
                {
                    failed.Add(factory.ToString());
                    failed.Add(e.Message);
                }
            }

            if (failed.Any())
            {
                failed.Insert(0, callerMemberName);
            }

            Assert.Empty(failed);
        }
    }
}
