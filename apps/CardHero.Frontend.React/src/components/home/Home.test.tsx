import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Home } from "./Home";

test("<Home /> renders correctly", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <Home appName="Test App" />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<Home /> renders correctly with route prefix", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <Home appName="Test App" routePrefix="/test/" />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
