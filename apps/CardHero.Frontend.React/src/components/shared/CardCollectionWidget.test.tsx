import React from "react";
import renderer from "react-test-renderer";
import { CardModel, ICardCollectionModel, ICardModel } from "../../clients/clients";
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
        name: "Test card"
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2"
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1)
        }, {
            card: CardModel.fromJS(data2)
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
        name: "Test card"
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2"
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1)
        }, {
            card: CardModel.fromJS(data2)
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
        name: "Test card"
    };
    const data2: ICardModel = {
        id: 2,
        name: "Test card 2"
    };
    const card: ICardCollectionModel[] = [
        {
            card: CardModel.fromJS(data1)
        }, {
            card: CardModel.fromJS(data2)
        }
    ];
    const tree = renderer
        .create(<CardCollectionWidget cardCollection={card} cardActionName="Click me" cardActionDisabled={true} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
