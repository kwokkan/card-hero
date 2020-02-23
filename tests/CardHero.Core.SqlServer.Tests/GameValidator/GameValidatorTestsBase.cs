using CardHero.Core.SqlServer.DataServices;

using Moq;

namespace CardHero.Core.SqlServer.Tests
{
    public partial class GameValidatorTestsBase
    {
        protected readonly Mock<IGameDataService> _mockGameDataService;

        protected readonly IGameValidator _gameValidator;

        public GameValidatorTestsBase()
        {
            _mockGameDataService = new Mock<IGameDataService>();

            _gameValidator = new GameValidator(_mockGameDataService.Object);
        }
    }
}
