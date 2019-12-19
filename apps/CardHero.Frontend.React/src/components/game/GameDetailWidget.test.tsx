import React from "react";
import renderer from "react-test-renderer";
import { GameType, IGameModel } from "../../clients/clients";
import { GameDetailWidget } from "./GameDetailWidget";

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
        name: "Test Game",
        startTime: new Date(2019, 12, 18, 20, 30, 40),
        type: GameType.TripleTriad
    };
    const tree = renderer
        .create(
            <GameDetailWidget game={game} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
