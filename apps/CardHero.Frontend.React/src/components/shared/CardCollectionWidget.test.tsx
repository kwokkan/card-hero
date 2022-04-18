import renderer from "react-test-renderer";
import { CardModel, ICardCollectionModel, ICardModel, Rarity, RarityModel } from "../../clients/clients";
import { CardCollectionWidget } from "./CardCollectionWidget";

test("<CardCollectionWidget /> renders no cards", () => {
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={[]} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders card with custom actionName", () => {
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={[]} title="Test widget" />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders title with no cards", () => {
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={[]} title="Test title" />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders card with cards", () => {
    const data1: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2",
        rarity: RarityModel.fromJS({
            id: Rarity.Common
        })
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1),
            id: 1
        }, {
            card: CardModel.fromJS(data2),
            id: 2
        }
    ];
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={card} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders card with cards and custom actions", () => {
    const data1: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2",
        rarity: RarityModel.fromJS({
            id: Rarity.Common
        })
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1),
            id: 1
        }, {
            card: CardModel.fromJS(data2),
            id: 2
        }
    ];
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={card} cardActionName="Click me" cardActionClassName="my-class" />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders card with cards disabled", () => {
    const data1: ICardModel = {
        id: 1,
        name: "Test card",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2",
        rarity: RarityModel.fromJS({
            id: Rarity.Common
        })
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1),
            id: 1
        }, {
            card: CardModel.fromJS(data2),
            id: 2
        }
    ];
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={card} cardActionName="Click me" cardActionDisabled={true} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardCollectionWidget /> renders cards with all rarities", () => {
    const data1: ICardModel = {
        id: 1,
        name: "Test legendary",
        rarity: RarityModel.fromJS({
            id: Rarity.Legendary
        })
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test epic",
        rarity: RarityModel.fromJS({
            id: Rarity.Epic
        })
    };
    const data3: ICardModel = {
        id: 3,
        name: "Test rare",
        rarity: RarityModel.fromJS({
            id: Rarity.Rare
        })
    };
    const data4: ICardModel = {
        id: 4,
        name: "Test uncommon",
        rarity: RarityModel.fromJS({
            id: Rarity.Uncommon
        })
    };
    const data5: ICardModel = {
        id: 5,
        name: "Test common",
        rarity: RarityModel.fromJS({
            id: Rarity.Common
        })
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1),
            id: 1
        }, {
            card: CardModel.fromJS(data2),
            id: 2
        }, {
            card: CardModel.fromJS(data3),
            id: 3
        }, {
            card: CardModel.fromJS(data4),
            id: 4
        }, {
            card: CardModel.fromJS(data5),
            id: 5
        }
    ];
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={card} cardActionName="Click me" cardActionDisabled={true} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
