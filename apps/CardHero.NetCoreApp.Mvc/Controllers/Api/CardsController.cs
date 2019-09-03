using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardHero.Core.Abstractions;
using CardHero.NetCoreApp.Mvc.Models;
using CardHero.NetCoreApp.Mvc.Models.ChartJs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers.Api
{
    [Route("api/[controller]")]
    public class CardsController : CardHeroController
    {
        private readonly ICardService _cardService;

        public CardsController(IUserService userService, ICardService cardService)
            : base(userService)
        {
            _cardService = cardService;
        }

        [Route("{id:int}")]
        public async Task<ChartViewModel> GetById(int id, string group = null)
        {
            var filter = new CardSearchFilter
            {
                Ids = new[] { id },
            };
            var card = (await _cardService.GetCardsAsync(filter)).Results.FirstOrDefault();
            var cardModel = new CardViewModel().FromCard(card);

            var model = new ChartViewModel
            {
                Type = "radar",
                Data = new DataViewModel
                {
                    Labels = cardModel.GetLabels(group: group),
                    Datasets = new List<DatasetViewModel>
                    {
                        new DatasetViewModel
                        {
                            Label = "Stats",
                            BackgroundColor = "rgba(0, 0, 200, 0.3)",
                            BorderColor = "rgba(0, 0, 200, 0.5)",
                            PointBorderColor = "rgba(0, 0, 0, 0)",
                            PointHoverBackgroundColor = "rgba(0, 0, 200, 0.5)",
                            PointHoverBorderColor = "rgba(0, 0, 200, 0.5)",
                            Data = cardModel.GetData(group: group),
                        },
                    },
                },
                Options = new OptionsViewModel
                {
                    Scale = new ScaleViewModel
                    {
                        Ticks = new TicksViewModel
                        {
                            BeginAtZero = true,
                            Max = 10,
                        },
                    },
                },
            };

            return model;
        }

        [HttpPost("favourite/{id:int}")]
        [Authorize]
        public async Task<bool> Favourite(int id)
        {
            var user = await GetUserAsync();

            var result = await _cardService.ToggleFavouriteAsync(id, user.Id);

            return result;
        }
    }
}