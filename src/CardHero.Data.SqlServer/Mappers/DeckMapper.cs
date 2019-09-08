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
                Id = source.DeckPk,
                UserId = source.UserFk,
            };
        }

        public Deck Map(DeckData destination)
        {
            throw new System.NotImplementedException();
        }
    }
}
