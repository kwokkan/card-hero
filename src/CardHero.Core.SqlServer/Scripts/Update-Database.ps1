Scaffold-DbContext `
"Server=.\SQLDEV2016;Database=CardHero;Integrated Security=true;MultipleActiveResultSets=true" `
Microsoft.EntityFrameworkCore.SqlServer `
-Force `
-Project CardHero.Core.SqlServer `
-StartupProject CardHero.Core.SqlServer `
-Context CardHeroDbContext `
-OutputDir EntityFramework `
