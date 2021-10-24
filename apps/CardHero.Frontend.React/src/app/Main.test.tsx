/*
 * @jest-environment jsdom
 */
import React from "react";
import renderer from "react-test-renderer";
import { AccountContextProvider, IAccountContextProviderProps } from "../contexts/AccountContextProvider";
import { Main } from "./Main";

test("<Main /> renders correctly without user", () => {
    const tree = renderer
        .create(
            <Main appName="Test app" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<Main /> renders correctly with user", () => {
    const props: IAccountContextProviderProps = {
        user: {
            coins: 123456789,
            fullName: "Test user"
        }
    };
    const tree = renderer
        .create(
            <AccountContextProvider value={props}>
                <Main appName="Test app" />
            </AccountContextProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
