namespace CardHero.Core.SqlServer.Tests
{
    public partial class GameValidatorTestsBase
    {
        protected readonly IGameValidator _gameValidator;

        public GameValidatorTestsBase()
        {
            _gameValidator = new GameValidator();
        }
    }
}
