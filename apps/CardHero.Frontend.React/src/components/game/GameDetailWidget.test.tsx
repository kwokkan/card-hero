import MockDate from "mockdate";
import renderer from "react-test-renderer";
import { GameType, IGameModel } from "../../clients/clients";
import { GameDetailWidget } from "./GameDetailWidget";

const mockDate = new Date(2019, 11, 18, 3, 4, 5, 6);

beforeEach(() => {
    MockDate.set(mockDate);
});

afterEach(() => {
    MockDate.reset();
});

test("<GameDetailWidget /> renders correctly without game", () => {
    const tree = renderer
        .create(
            <GameDetailWidget game={null} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<GameDetailWidget /> renders correctly with game", () => {
    const game: IGameModel = {
        id: 10,
        startTime: new Date(2019, 12, 18, 20, 30, 40),
        type: GameType.Standard
    };
    const tree = renderer
        .create(
            <GameDetailWidget game={game} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
