import renderer from "react-test-renderer";
import { GameBanner } from "./GameBanner";

test("<GameBanner /> renders null when not visible", () => {
    const tree = renderer
        .create(
            <GameBanner visible={false} message="My message" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<GameBanner /> renders with message", () => {
    const tree = renderer
        .create(
            <GameBanner visible={true} message="My message" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<GameBanner /> renders with message and additional class", () => {
    const tree = renderer
        .create(
            <GameBanner visible={true} message="My message" additionalClasses="new-class more-class" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
