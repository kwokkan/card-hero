import renderer from "react-test-renderer";
import { ICardModel } from "../../clients/clients";
import { CardStatsWidget } from "./CardStatsWidget";

test("<CardStatsWidget /> renders correctly", () => {
    const card: ICardModel = {
        attack: 1,
        defence: 2,
        downAttack: 3,
        health: 4,
        id: 100,
        leftAttack: 5,
        name: "jest",
        rightAttack: 6,
        totalStats: 8,
        upAttack: 9
    };
    const tree = renderer
        .create(<CardStatsWidget card={card} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CardStatsWidget /> renders correctly with favourite", () => {
    const card: ICardModel = {
        attack: 1,
        defence: 2,
        downAttack: 3,
        health: 4,
        id: 100,
        isFavourited: true,
        leftAttack: 5,
        name: "jest",
        rightAttack: 6,
        totalStats: 8,
        upAttack: 9
    };
    const tree = renderer
        .create(<CardStatsWidget card={card} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
