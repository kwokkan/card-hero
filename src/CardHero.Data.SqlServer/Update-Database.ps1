Scaffold-DbContext `
"Server=.\SQLDEV2016;Database=CardHero;Integrated Security=true;MultipleActiveResultSets=true;Trust Server Certificate=true;" `
Microsoft.EntityFrameworkCore.SqlServer `
-Force `
-Project CardHero.Data.SqlServer `
-StartupProject CardHero.Data.SqlServer `
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
