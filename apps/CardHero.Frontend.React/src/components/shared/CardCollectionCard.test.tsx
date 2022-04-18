import renderer from "react-test-renderer";
import { CardModel, ICardCollectionModel, ICardModel, Rarity, RarityModel } from "../../clients/clients";
import { CardCollectionCard } from "./CardCollectionCard";

test("<CardCollectionCard /> renders empty card", () => {
    const data: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const card: ICardCollectionModel = {
        card: CardModel.fromJS(data)
    };
    const tree = renderer
        .create(<CardCollectionCard card={card} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionCard /> renders card with custom actionName", () => {
    const data: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const card: ICardCollectionModel = {
        card: CardModel.fromJS(data)
    };
    const tree = renderer
        .create(<CardCollectionCard card={card} actionName="Click me" />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionCard /> renders card with custom actionClassName", () => {
    const data: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const card: ICardCollectionModel = {
        card: CardModel.fromJS(data)
    };
    const tree = renderer
        .create(<CardCollectionCard card={card} actionName="Click me" actionClassName="my-action" />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionCard /> renders card with disabled", () => {
    const data: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const card: ICardCollectionModel = {
        card: CardModel.fromJS(data)
    };
    const tree = renderer
        .create(<CardCollectionCard card={card} actionName="Click me" actionDisabled={true} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
