using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer
{
    public interface IGameValidator
    {
        Task ValidateGameAsync(Game game);
    }
}
