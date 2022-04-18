import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { IUserModel } from "../../clients/clients";
import { NavMenu } from "./NavMenu";

test("<NavMenu /> renders with no user", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <NavMenu appName="Test App" />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NavMenu /> renders with user", () => {
    const user: IUserModel = {
        coins: 123456,
        fullName: "Test user"
    };

    const tree = renderer
        .create(
            <MemoryRouter>
                <NavMenu appName="Test App" user={user} />
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
