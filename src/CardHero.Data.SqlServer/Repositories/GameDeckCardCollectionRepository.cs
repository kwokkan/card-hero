using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    internal class GameDeckCardCollectionRepository : IGameDeckCardCollectionRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        private readonly IMapper<GameDeckCardCollection, GameDeckCardCollectionData> _gameDeckCardCollectionMapper;

        public GameDeckCardCollectionRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<GameDeckCardCollection, GameDeckCardCollectionData> gameDeckCardCollectionMapper
        )
        {
            _factory = factory;

            _gameDeckCardCollectionMapper = gameDeckCardCollectionMapper;
        }

        Task<ReadOnlyCollection<GameDeckCardCollectionData>> IGameDeckCardCollectionRepository.SearchAsync(GameDeckCardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var query = context.GameDeckCardCollection.AsQueryable();

                if (filter.Ids != null && filter.Ids.Any())
                {
                    query = query.Where(x => filter.Ids.Contains(x.GameDeckCardCollectionPk));
                }

                if (filter.UserId.HasValue)
                {
                    query = query.Include(x => x.GameDeckFkNavigation);
                    query = query.Where(x => x.GameDeckFkNavigation.GameUserFk == filter.UserId.Value);
                }

                var result = query.Select(_gameDeckCardCollectionMapper.Map).ToArray();

                return Task.FromResult(Array.AsReadOnly(result));
            }
        }
    }
}
