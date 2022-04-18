/*
 * @jest-environment jsdom
 */
import MockDate from "mockdate";
import renderer, { act } from "react-test-renderer";
import { StoreApiClient, StoreItemModel } from "../../clients/clients";
import { StoreApp } from "./StoreApp";

const mockDate = new Date(2019, 11, 18, 3, 4, 5, 6);

beforeEach(() => {
    MockDate.set(mockDate);
});

afterEach(() => {
    MockDate.reset();
});

test("<StoreApp /> renders correctly with no items", () => {
    const tree = renderer
        .create(
            <StoreApp />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<StoreApp /> renders correctly with items", async () => {
    StoreApiClient.prototype.get = jest.fn(() => Promise.resolve([
        new StoreItemModel({
            id: 1,
            name: "First",
            description: "First bundle",
            cost: 100,
            itemCount: 1
        }),
        new StoreItemModel({
            id: 2,
            name: "Second",
            description: "Second bundle",
            cost: 500,
            itemCount: 5,
            expiry: new Date(2019, 11, 19)
        })
    ]));

    let tree: renderer.ReactTestRenderer;

    await act(async () => {
        tree = renderer
            .create(
                <StoreApp />
            );
    });

    const json = tree.toJSON();

    expect(json).toMatchSnapshot();
});
