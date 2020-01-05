using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.TypeScript.Controllers.Api
{
    [Route("api/packs")]
    public class CardPackApiController : CardHeroControllerBase
    {
        private readonly ICardPackService _cardPackService;

        public CardPackApiController(IUserService userService, ICardPackService cardPackService)
            : base(userService)
        {
            _cardPackService = cardPackService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CardPackModel[]>> GetAsync(CancellationToken cancellationToken)
        {
            var result = await _cardPackService.GetCardPacksAsync(cancellationToken: cancellationToken);

            return result.Results;
        }
    }
}
