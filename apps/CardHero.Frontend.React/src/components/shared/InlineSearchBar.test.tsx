import renderer from "react-test-renderer";
import { InlineSearchBar } from "./InlineSearchBar";

test("<InlineSearchBar /> renders without default value", () => {
    const tree = renderer
        .create(
            <InlineSearchBar />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<InlineSearchBar /> renders with default value", () => {
    const tree = renderer
        .create(
            <InlineSearchBar value="Test" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
