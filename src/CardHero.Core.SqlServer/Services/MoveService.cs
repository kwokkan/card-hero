using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class MoveService : BaseService, IMoveService
    {
        private readonly IMoveRepository _moveRepository;

        private readonly IDataMapper<MoveData, MoveModel> _moveDataMapper;

        public MoveService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IMoveRepository moveRepository,
            IDataMapper<MoveData, MoveModel> moveDataMapper
        )
            : base(contextFactory)
        {
            _moveRepository = moveRepository;

            _moveDataMapper = moveDataMapper;
        }

        async Task<ReadOnlyCollection<MoveModel>> IMoveService.GetMovesAsync(int gameId, CancellationToken cancellationToken)
        {
            var moves = await _moveRepository.GetMovesByGameIdAsync(gameId, cancellationToken: cancellationToken);

            var models = moves.Select(_moveDataMapper.Map).ToList();

            return new ReadOnlyCollection<MoveModel>(models);
        }
    }
}
