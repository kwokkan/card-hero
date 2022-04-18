import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { ICardModel, Rarity, RarityModel } from "../../clients/clients";
import { AccountContext, IAccountContextProps } from "../../contexts/AccountContext";
import { CardList } from "./CardList";

test("<CardList /> renders correctly", () => {
    const cards: ICardModel[] = [
        {
            attack: 1,
            defence: 2,
            description: "First Card desc",
            downAttack: 3,
            health: 4,
            id: 1,
            isFavourited: false,
            leftAttack: 5,
            name: "First Card name",
            rarity: RarityModel.fromJS({
                id: Rarity.Common
            }),
            rightAttack: 6,
            totalStats: 7,
            upAttack: 8,
        },
        {
            attack: 11,
            defence: 12,
            description: "Second Card desc",
            downAttack: 13,
            health: 14,
            id: 2,
            isFavourited: true,
            leftAttack: 15,
            name: "Second Card name",
            rarity: RarityModel.fromJS({
                id: Rarity.Legendary
            }),
            rightAttack: 16,
            totalStats: 17,
            upAttack: 18,
        }
    ];
    const contextValue: IAccountContextProps = {
        user: {
            id: 999
        },
        setUser: () => { }
    };
    const tree = renderer
        .create(
            <AccountContext.Provider value={contextValue}>
                <MemoryRouter>
                    <CardList cards={cards} routePrefix="/jest/" />
                </MemoryRouter>
            </AccountContext.Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
