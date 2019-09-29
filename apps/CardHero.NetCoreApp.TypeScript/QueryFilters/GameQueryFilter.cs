using System;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameQueryFilter : QueryFilterBase
    {
        public int? GameId { get; set; }

        public string Name { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int PlayerCount { get; set; }

        public bool ActiveOnly { get; set; } = true;

        public GameType? Type { get; set; }

        public GameSearchFilter ToSearchFilter()
        {
            return new GameSearchFilter
            {
                ActiveOnly = this.ActiveOnly,
                EndTime = this.EndTime,
                GameId = this.GameId,
                Name = this.Name,
                Page = this.Page,
                PageSize = this.PageSize,
                PlayerCount = this.PlayerCount,
                StartTime = this.StartTime,
                Type = this.Type,
            };
        }
    }
}
