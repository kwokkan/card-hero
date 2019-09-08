using System.Linq;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public static class EntityFrameworkExtensions
    {
        public static CardModel ToCore(this Card card, int? userId = null)
        {
            if (card == null)
            {
                return null;
            }

            return new CardModel
            {
                Description = card.Description,
                DownAttack = card.DownAttack,
                Id = card.CardPk,
                LeftAttack = card.LeftAttack,
                Name = card.Name,
                RightAttack = card.RightAttack,
                UpAttack = card.UpAttack,
                Health = card.Health,
                Attack = card.Attack,
                Defence = card.Defence,
                TotalStats = card.TotalStats,
                Rarity = (Models.Rarity)card.RarityFk,

                IsFavourited = !userId.HasValue ? false : card.CardFavourite.Any(x => x.UserFk == userId.Value),
            };
        }

        public static CardCollectionModel ToCore(this CardCollection collection, int? userId = null)
        {
            return new CardCollectionModel
            {
                Card = collection.CardFkNavigation.ToCore(userId),
                CardId = collection.CardFk,
                Id = collection.CardCollectionPk,
                User = collection.UserFkNavigation.ToCore(),
                UserId = collection.UserFk,
            };
        }

        public static DeckModel ToCore(this Deck deck, int? userId = null)
        {
            return deck == null ? null : new DeckModel
            {
                Cards = deck.DeckCardCollection.Select(x => x.ToCore()),
                Description = deck.Description,
                Id = deck.DeckPk,
                MaxCards = deck.MaxCards,
                Name = deck.Name,

                IsFavourited = !userId.HasValue ? false : deck.DeckFavourite.Any(x => x.UserFk == userId.Value),
            };
        }

        public static DeckCardModel ToCore(this DeckCardCollection deckCard)
        {
            return new DeckCardModel
            {
                CardCollectionId = deckCard.CardCollectionFk,
                DownAttack = deckCard.CardCollectionFkNavigation.CardFkNavigation.DownAttack,
                Id = deckCard.DeckCardCollectionPk,
                LeftAttack = deckCard.CardCollectionFkNavigation.CardFkNavigation.LeftAttack,
                Name = deckCard.CardCollectionFkNavigation.CardFkNavigation.Name,
                RightAttack = deckCard.CardCollectionFkNavigation.CardFkNavigation.RightAttack,
                UpAttack = deckCard.CardCollectionFkNavigation.CardFkNavigation.UpAttack,
                Health = deckCard.CardCollectionFkNavigation.CardFkNavigation.Health,
                Attack = deckCard.CardCollectionFkNavigation.CardFkNavigation.Attack,
                Defence = deckCard.CardCollectionFkNavigation.CardFkNavigation.Defence,
                Rarity = (Models.Rarity)deckCard.CardCollectionFkNavigation.CardFkNavigation.RarityFk,
                TotalStats = deckCard.CardCollectionFkNavigation.CardFkNavigation.TotalStats,
            };
        }

        public static GameModel ToCore(this Game game)
        {
            return new GameModel
            {
                Columns = game.Columns,
                CurrentUser = game.CurrentUserFkNavigation.ToCore(),
                Deck = game.DeckFkNavigation.ToCore(),
                EndTime = game.EndTime,
                Id = game.GamePk,
                Name = game.Name,
                Users = game.GameUser.Select(x => x.UserFkNavigation.ToCore()),
                Rows = game.Rows,
                StartTime = game.StartTime,
                Turns = game.Turn.Select(x => x.ToCore()),
                Type = (Models.GameType)game.GameTypeFk,
                Winner = game.WinnerFk.HasValue ? game.WinnerFkNavigation.ToCore() : null,
            };
        }

        public static StoreItemModel ToCore(this StoreItem storeItem)
        {
            return new StoreItemModel
            {
                Cost = storeItem.Cost,
                Description = storeItem.Description,
                Expiry = storeItem.Expiry,
                Id = storeItem.StoreItemPk,
                ItemCount = storeItem.ItemCount,
                Name = storeItem.Name,
            };
        }

        public static TurnModel ToCore(this Turn turn)
        {
            return new TurnModel
            {
                EndTime = turn.EndTime,
                Game = turn.GameFkNavigation.ToCore(),
                Id = turn.TurnPk,
                User = turn.CurrentUserFkNavigation.ToCore(),
                StartTime = turn.StartTime,
            };
        }

        public static UserModel ToCore(this User user)
        {
            if (user == null)
            {
                return null;
            }

            return new UserModel
            {
                Coins = user.Coins,
                CreatedDate = user.CreatedDate,
                FullName = user.FullName,
                Id = user.UserPk,
                Identifier = user.Identifier,
                IdPsource = user.IdPsource,
            };
        }
    }
}
