Scaffold-DbContext `
"Host=localhost;Database=cardhero;Username=cardhero_user;Password=password" `
Npgsql.EntityFrameworkCore.PostgreSQL `
-Force `
-Project CardHero.Data.PostgreSql `
-StartupProject CardHero.Data.PostgreSql `
-Context CardHeroDataDbContext `
-OutputDir EntityFramework `
-NoOnConfiguring `
-NoPluralize `
-Tables `
Card,`
CardCollection,`
CardFavourite,`
CardPack,`
Deck,`
DeckCardCollection,`
DeckFavourite,`
Game,`
GameDeck,`
GameDeckCardCollection,`
GameUser,`
Move,`
Rarity,`
StoreItem,`
Turn,`
User
