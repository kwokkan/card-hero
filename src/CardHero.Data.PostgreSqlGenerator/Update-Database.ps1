Scaffold-DbContext `
"Host=localhost;Database=cardhero;Username=cardhero_user;Password=password" `
Npgsql.EntityFrameworkCore.PostgreSQL `
-Force `
-Project CardHero.Data.PostgreSql `
-StartupProject CardHero.Data.PostgreSqlGenerator `
-Context CardHeroDataDbContext `
-OutputDir EntityFramework `
-Tables `
Card,`
CardCollection,`
CardFavourite,`
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
