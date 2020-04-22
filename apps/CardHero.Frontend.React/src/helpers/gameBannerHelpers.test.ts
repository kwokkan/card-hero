import { getGameBannerMessage } from "./gameBannerHelpers";
import { IGameModel, IUserModel } from "../clients/clients";

test("No game passed in - return shouldDisplay = false", () => {
    const message = getGameBannerMessage(null, null);

    expect(message.shouldDisplay).toBe(false);
});

test("Game passed in - not ended - return shouldDisplay = false", () => {
    const game: IGameModel = {
        endTime: null
    };

    const message = getGameBannerMessage(game, null);

    expect(message.shouldDisplay).toBe(false);
});

test("Game passed in - ended with no winner - return shouldDisplay = true, message = Draw", () => {
    const game: IGameModel = {
        endTime: new Date()
    };

    const message = getGameBannerMessage(game, null);

    expect(message.shouldDisplay).toBe(true);
    expect(message.message).toBe("Draw");
});

test("Game passed in - ended with winner, no user - return shouldDisplay = true, message = Player wins", () => {
    const game: IGameModel = {
        endTime: new Date(),
        winnerUserId: 5
    };

    const message = getGameBannerMessage(game, null);

    expect(message.shouldDisplay).toBe(true);
    expect(message.message).toBe("Player 5 wins");
});

test("Game passed in - ended with winner, with user not in game - return shouldDisplay = true, message = Player", () => {
    const game: IGameModel = {
        endTime: new Date(),
        winnerUserId: 5,
        userIds: [
            5,
            10
        ]
    };
    const user: IUserModel = {
        id: 999
    };
    const message = getGameBannerMessage(game, user);

    expect(message.shouldDisplay).toBe(true);
    expect(message.message).toBe("Player 5 wins");
});

test("Game passed in - ended with winner, you won - return shouldDisplay = true, message = you won", () => {
    const game: IGameModel = {
        endTime: new Date(),
        winnerUserId: 5,
        userIds: [
            5,
            10
        ]
    };
    const user: IUserModel = {
        id: 5
    };
    const message = getGameBannerMessage(game, user);

    expect(message.shouldDisplay).toBe(true);
    expect(message.message).toBe("You are winner");
});

test("Game passed in - ended with winner, you lost - return shouldDisplay = true, message = opponent wins", () => {
    const game: IGameModel = {
        endTime: new Date(),
        winnerUserId: 5,
        userIds: [
            5,
            10
        ]
    };
    const user: IUserModel = {
        id: 10
    };
    const message = getGameBannerMessage(game, user);

    expect(message.shouldDisplay).toBe(true);
    expect(message.message).toBe("Player 5 wins");
});
