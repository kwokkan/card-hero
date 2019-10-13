﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    public class GameRepository : IGameRepository
    {
        private const int DefaultPageSize = 30;

        private readonly ICardHeroDataDbContextFactory _factory;
        private readonly IMapper<Game, GameData> _gameMapper;
        private readonly IMapper<GameUser, GameUserData> _gameUserMapper;

        public GameRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<Game, GameData> gameMapper,
            IMapper<GameUser, GameUserData> gameUseMapper
        )
        {
            _factory = factory;
            _gameMapper = gameMapper;
            _gameUserMapper = gameUseMapper;
        }

        public async Task<GameData> AddGameAsync(GameCreateData game, CancellationToken cancellationToken = default)
        {
            var data = new Game
            {
                Columns = game.Columns,
                GameTypeFk = (int)game.Type,
                Name = game.Name,
                Rows = game.Rows,
                StartTime = DateTime.UtcNow,
            };

            using (var context = _factory.Create(trackChanges: true))
            {
                context.Game.Add(data);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }

            return await GetGameByIdAsync(data.GamePk, cancellationToken: cancellationToken);
        }

        public async Task<SearchResult<GameData>> FindGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var query = context.Game.AsQueryable();

                if (filter.GameId.HasValue)
                {
                    query = query.Where(x => x.GamePk == filter.GameId.Value);
                }

                if (filter.Type.HasValue)
                {
                    query = query.Where(x => x.GameTypeFk == (int)filter.Type.Value);
                }

                var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

                query = query.OrderByDescending(x => x.GamePk);

                query = query.Skip(0).Take(DefaultPageSize);

                var results = query.Select(_gameMapper.Map).ToArray();

                var result = new SearchResult<GameData>
                {
                    CurrentPage = 0,
                    PageSize = DefaultPageSize,
                    Results = results,
                    TotalCount = totalCount,
                };

                return result;
            }
        }

        public async Task<GameData> GetGameByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var games = await FindGamesAsync(new GameSearchFilter
            {
                GameId = id,
            });

            return games.Results.FirstOrDefault();
        }

        public async Task<GameUserData[]> GetGameUsersAsync(int gameId, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var result = await context
                    .GameUser
                    .Where(x => x.GameFk == gameId)
                    .Select(x => _gameUserMapper.Map(x))
                    .ToArrayAsync(cancellationToken: cancellationToken);

                return result;
            }
        }

        public async Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var result = await context
                    .Move
                    .Include(x => x.TurnFkNavigation)
                    .Where(x => x.TurnFkNavigation.GameFk == gameId)
                    .Select(x => new MoveData
                    {
                        GameDeckCardCollectionId = x.GameDeckCardCollectionFk,
                        Column = x.Column,
                        GameId = x.TurnFkNavigation.GameFk,
                        Row = x.Row,
                        GameUserId = x.TurnFkNavigation.CurrentGameUserFk,
                    })
                    .ToArrayAsync(cancellationToken: cancellationToken);

                return result;
            }
        }

        public async Task<GameData> UpdateGameAsync(int id, GameUpdateData update, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create(trackChanges: true))
            {
                var existingGame = await context.Game.SingleOrDefaultAsync(x => x.GamePk == id, cancellationToken: cancellationToken);

                if (existingGame == null)
                {
                    throw new CardHeroDataException($"Game { id } does not exist.");
                }

                if (update.CurrentGameUserId.IsSet)
                {
                    existingGame.CurrentGameUserFk = update.CurrentGameUserId.Value;
                }

                if (update.WinnerId.IsSet)
                {
                    existingGame.WinnerFk = update.WinnerId.Value;
                }

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }

            return await GetGameByIdAsync(id, cancellationToken: cancellationToken);
        }
    }
}
