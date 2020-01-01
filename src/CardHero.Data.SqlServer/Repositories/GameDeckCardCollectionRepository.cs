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
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<GameDeckCardCollection, GameDeckCardCollectionData> _gameDeckCardCollectionMapper;

        public GameDeckCardCollectionRepository(
            CardHeroDataDbContext context,
            IMapper<GameDeckCardCollection, GameDeckCardCollectionData> gameDeckCardCollectionMapper
        )
        {
            _context = context;

            _gameDeckCardCollectionMapper = gameDeckCardCollectionMapper;
        }

        Task<ReadOnlyCollection<GameDeckCardCollectionData>> IGameDeckCardCollectionRepository.SearchAsync(GameDeckCardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context.GameDeckCardCollection.AsQueryable();

            if (filter.Ids != null && filter.Ids.Any())
            {
                query = query.Where(x => filter.Ids.Contains(x.GameDeckCardCollectionPk));
            }

            if (filter.UserId.HasValue)
            {
                query = query
                    .Include(x => x.GameDeckFkNavigation)
                    .ThenInclude(x => x.GameUserFkNavigation)
                ;
                query = query.Where(x => x.GameDeckFkNavigation.GameUserFkNavigation.UserFk == filter.UserId.Value);
            }

            var result = query.Select(_gameDeckCardCollectionMapper.Map).ToArray();

            return Task.FromResult(Array.AsReadOnly(result));
        }
    }
}
