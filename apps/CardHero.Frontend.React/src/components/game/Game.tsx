import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { GameType, IGameDeckModel, IGamePlayModel } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";
import { getGameBannerMessage } from "../../helpers/gameBannerHelpers";
import { GamePlayService } from "../../services/GamePlayService";
import { GameBanner } from "./GameBanner";
import { GameBoard, IGameBoardOnUpdatedProps } from "./GameBoard";
import { GameDeckWidget } from "./GameDeckWidget";
import { GameDetailWidget } from "./GameDetailWidget";
import { GameHistoryWidget } from "./GameHistoryWidget";
import { GameUsersWidget } from "./GameUsersWidget";

interface IGameProps {
    id: number;
}

interface IGameState {
    gamePlay?: IGamePlayModel;
    gameDeck?: IGameDeckModel;
    lastUpdate: Date;
}

export class Game extends Component<IGameProps, IGameState> {
    static contextType = AccountContext;

    private _interval: number;

    constructor(props: IGameProps) {
        super(props);

        this.state = {
            lastUpdate: new Date(0)
        };
    }

    private getPlayedGameDeckCardCollectionIds(gamePlay?: IGamePlayModel): number[] {
        let playedGdccIds: number[];

        if (gamePlay && gamePlay.game.type === GameType.Standard) {
            playedGdccIds = gamePlay.moves.map(x => x.gameDeckCardCollectionId);
        }

        return playedGdccIds;
    }

    private async populateGame(id: number) {
        const gamePlay = await GamePlayService.getGamePlayById(id);

        if (gamePlay) {
            const game = gamePlay.game;

            const lastActivity = new Date(game.startTime.getTime() + gamePlay.moves.length);

            if (this.state.lastUpdate < lastActivity) {
                this.setState({
                    gamePlay: gamePlay,
                    gameDeck: gamePlay.gameDeck,
                    lastUpdate: lastActivity
                });
            }

            if (game.endTime) {
                window.clearInterval(this._interval);
            }
        }
    }

    async componentDidMount() {
        const gameId: number = this.props.id;

        await this.populateGame(gameId);

        this._interval = window.setInterval(async () => {
            await this.populateGame(gameId);
        }, 5000);
    }

    componentWillUnmount() {
        window.clearInterval(this._interval);
    }

    onGameBoardUpdated = async (event: IGameBoardOnUpdatedProps) => {
        await this.populateGame(event.gamePlay.game.id);
    };

    render() {
        const gamePlay = this.state.gamePlay;
        const game = (gamePlay || {}).game;
        const playedGdccIds = this.getPlayedGameDeckCardCollectionIds(gamePlay);

        const user = this.context.user;
        const gameBanner = getGameBannerMessage(game, user);

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-2">
                        <GameDetailWidget game={game} />

                        <GameUsersWidget
                            currentUserId={game ? game.currentUserId : null}
                            userIds={game ? game.userIds : null}
                        />

                        <GameHistoryWidget game={game} />
                    </div>

                    <DndProvider backend={HTML5Backend}>
                        <div className="col-lg-6">
                            <GameBanner visible={gameBanner.shouldDisplay} message={gameBanner.message} additionalClasses={gameBanner.additionalClass} />

                            <GameBoard
                                gamePlay={gamePlay}
                                onUpdated={this.onGameBoardUpdated}
                            />
                        </div>

                        <div className="col-lg-2">
                            <GameDeckWidget
                                gameDeck={this.state.gameDeck}
                                excludeGameDeckCardCollectionIds={playedGdccIds}
                            />
                        </div>
                    </DndProvider>
                </div>
            </div>
        );
    }
}
