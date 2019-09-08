using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class DeckMapper : IMapper<Deck, DeckData>
    {
        public DeckData Map(Deck source)
        {
            return new DeckData
            {
                Description = source.Description,
                Id = source.DeckPk,
                Name = source.Name,
                UserId = source.UserFk,
            };
        }

        public Deck Map(DeckData destination)
        {
            throw new System.NotImplementedException();
        }
    }
}
