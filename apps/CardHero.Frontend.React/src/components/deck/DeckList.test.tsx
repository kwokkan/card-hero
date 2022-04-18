import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { IDeckModel } from "../../clients/clients";
import { AccountContext, IAccountContextProps } from "../../contexts/AccountContext";
import { DeckList } from "./DeckList";

test("<DeckList /> renders correctly", () => {
    const decks: IDeckModel[] = [
        {
            id: 1,
            isFavourited: false,
            name: "Test deck"
        },
        {
            id: 2,
            isFavourited: true,
            name: "Test deck 2"
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
                    <DeckList decks={decks} routePrefix="/jest/" />
                </MemoryRouter>
            </AccountContext.Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
