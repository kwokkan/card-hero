using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameRepository
    {
        Task<GameData> AddGameAsync(GameCreateData game, CancellationToken cancellationToken = default);

        Task<SearchResult<GameData>> FindGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default);

        Task<GameData> GetGameByIdAsync(int id, CancellationToken cancellationToken = default);

        Task<GameUserData[]> GetGameUsersAsync(int gameId, CancellationToken cancellationToken = default);

        Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates a game.
        /// </summary>
        /// <param name="id">The game id.</param>
        /// <param name="update">The game update.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>The updated game.</returns>
        /// <exception cref="CardHeroDataException">When the game does not exist.</exception>
        Task<GameData> UpdateGameAsync(int id, GameUpdateData update, CancellationToken cancellationToken = default);
    }
}
