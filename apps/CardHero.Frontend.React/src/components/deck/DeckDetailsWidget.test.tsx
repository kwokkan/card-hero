import renderer from "react-test-renderer";
import { IDeckModel } from "../../clients/clients";
import { DeckDetailsWidget } from "./DeckDetailsWidget";

test("<DeckDetailsWidget /> renders correctly without favourite", () => {
    const deck: IDeckModel = {
        id: 1,
        maxCards: 5,
        name: "Test deck"
    };
    const tree = renderer
        .create(
            <DeckDetailsWidget deck={deck} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<DeckDetailsWidget /> renders correctly with favourite", () => {
    const deck: IDeckModel = {
        id: 1,
        isFavourited: true,
        maxCards: 5,
        name: "Test deck"
    };
    const tree = renderer
        .create(
            <DeckDetailsWidget deck={deck} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<DeckDetailsWidget /> renders correctly with description", () => {
    const deck: IDeckModel = {
        description: "Test deck description",
        id: 1,
        maxCards: 5,
        name: "Test deck"
    };
    const tree = renderer
        .create(
            <DeckDetailsWidget deck={deck} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
