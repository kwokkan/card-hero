using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameRepository
    {
        Task<GameData> AddGameAsync(GameData game, CancellationToken cancellationToken = default);

        Task<SearchResult<GameData>> FindGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default);

        Task<GameData> GetGameByIdAsync(int id, CancellationToken cancellationToken = default);

        Task<GameUserData[]> GetGameUsersAsync(int gameId, CancellationToken cancellationToken = default);

        Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
