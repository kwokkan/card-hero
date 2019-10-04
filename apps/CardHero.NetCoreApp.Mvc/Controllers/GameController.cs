﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.NetCoreApp.Mvc.Extensions;
using CardHero.NetCoreApp.Mvc.Models;

using KwokKan.Sortable;

using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.Controllers
{
    [Route("[controller]")]
    public class GameController : CardHeroController
    {
        private readonly IDeckService _deckService;
        private readonly IGameService _gameService;
        private readonly IMoveService _moveService;
        private readonly ISortableHelper _sortableHelper;

        public GameController(IUserService userService, IDeckService deckService, IGameService gameService, IMoveService moveService, ISortableHelper sortableHelper)
            : base(userService)
        {
            _deckService = deckService;
            _gameService = gameService;
            _moveService = moveService;
            _sortableHelper = sortableHelper;
        }

        public async Task<IActionResult> Index(GameSearchViewModel model, CancellationToken cancellationToken)
        {
            var filter = new GameSearchFilter
            {
                ActiveOnly = model.ActiveOnly,
                Name = model.Name,
                Page = model.Page,
                PageSize = model.PageSize,
                Type = model.Type,
                UserId = (await GetUserAsync(cancellationToken: cancellationToken))?.Id,
            };
            _sortableHelper.ApplySortable(filter, model.Sort, model.SortDir);

            var result = await _gameService.GetGamesAsync(filter, cancellationToken: cancellationToken);

            model.Games = result.Results.Select(x => new GameViewModel().FromGame(x));
            model.Total = result.Count;

            return View(model);
        }

        [Route("{id:int}")]
        public async Task<IActionResult> View(int id, CancellationToken cancellationToken)
        {
            var filter = new GameSearchFilter
            {
                GameId = id,
            };
            var game = (await _gameService.GetGamesAsync(filter, cancellationToken: cancellationToken)).Results.FirstOrDefault();
            var moves = await _moveService.GetMovesAsync(id, cancellationToken: cancellationToken);

            var model = new GameViewModel().FromGame(game);
            var data = new GameTripleTriadViewModel
            {
                Columns = game.Columns,
                Moves = moves.Select(x => new GameTripleTriadMoveViewModel
                {
                    CardCollectionId = x.CardCollectionId,
                    Column = x.Column,
                    Row = x.Row,
                }).ToList(),
                Rows = game.Rows,
            };
            model.Data = data;

            foreach (var card in model.Deck.Cards)
            {
                card.IsUsable = !data.Moves.Any(x => x.CardCollectionId == card.CardCollectionId);
            }

            return View(model);
        }

        private async Task PopulateGameCreateViewModel(GameCreateViewModel model, CancellationToken cancellationToken)
        {
            var filter = new DeckSearchFilter
            {
            };
            var decks = await _deckService.GetDecksAsync(filter, cancellationToken: cancellationToken);

            model.Decks = decks.Results.OrderBy(x => x.Name).Select(x => new DeckViewModel().FromDeck(x)).ToList();
        }

        [Route("[action]")]
        public async Task<IActionResult> Create(CancellationToken cancellationToken)
        {
            var model = new GameCreateViewModel
            {
            };
            await PopulateGameCreateViewModel(model, cancellationToken: cancellationToken);

            if (Request.IsAjaxRequest())
            {
                return PartialView(model);
            }

            return View(model);
        }

        [HttpPost("[action]")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(GameCreateViewModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var user = await GetUserAsync(cancellationToken: cancellationToken);
                var game = new GameCreateModel
                {
                    DeckId = model.SelectedDeckId.Value,
                    Name = model.Name,
                    Type = model.Type,
                    Users = new UserModel[] { user },
                };
                var newGame = await _gameService.CreateGameAsync(game, cancellationToken: cancellationToken);

                var url = Url.Action("View", new { id = newGame.Id });

                return Json(new JsonViewModel
                {
                    RedirectUrl = url,
                });
            }

            await PopulateGameCreateViewModel(model, cancellationToken: cancellationToken);

            return View(model);
        }
    }
}
