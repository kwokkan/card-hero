import { IGameModel, IUserModel } from "../clients/clients";

interface IGameBannerMessage {
    shouldDisplay: boolean;
    message?: string;
    additionalClass?: string;
}

export function getGameBannerMessage(game?: IGameModel, user?: IUserModel): IGameBannerMessage {
    let shouldDisplay = false;

    if (game) {
        shouldDisplay = !!game.endTime;
    }

    if (shouldDisplay) {
        if (!game.winnerUserId) {
            return {
                shouldDisplay: shouldDisplay,
                message: "Draw",
                additionalClass: "draw"
            };
        }

        if (!user) {
            return {
                shouldDisplay: shouldDisplay,
                message: "Player " + game.winnerUserId + " wins",
                additionalClass: "win"
            };
        }
        else {
            const userId = user.id;
            const isUserInGame = game.userIds.findIndex(x => x === userId) > -1;

            if (!isUserInGame) {
                return {
                    shouldDisplay: shouldDisplay,
                    message: "Player " + game.winnerUserId + " wins",
                    additionalClass: "win"
                }
            }

            if (game.winnerUserId === userId) {
                return {
                    shouldDisplay: shouldDisplay,
                    message: "You are winner",
                    additionalClass: "win"
                }
            }

            return {
                shouldDisplay: shouldDisplay,
                message: "Player " + game.winnerUserId + " wins",
                additionalClass: "lose"
            };
        }
    }

    return {
        shouldDisplay: shouldDisplay
    };
}
