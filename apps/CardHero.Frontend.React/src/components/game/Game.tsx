import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { GameType, IGameDeckModel, IGamePlayModel } from "../../clients/clients";
import { GameService } from "../../services/GameService";
import { GameBoard, IGameBoardOnUpdatedProps } from "./GameBoard";
import { GameDeckWidget } from "./GameDeckWidget";
import { GameDetailWidget } from "./GameDetailWidget";
import { GameHistoryWidget } from "./GameHistoryWidget";
import { GameUsersWidget } from "./GameUsersWidget";

interface IGameProps {
    id: number;
}

interface IGameState {
    game?: IGamePlayModel;
    gameDeck?: IGameDeckModel;
    lastUpdate: Date;
}

export class Game extends Component<IGameProps, IGameState> {
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
        const game = await GameService.getGameById(id);

        if (game) {
            const lastActivity = new Date(game.game.startTime.getTime() + game.moves.length);

            if (this.state.lastUpdate < lastActivity) {
                this.setState({
                    game: game,
                    gameDeck: game.game.gameDeck,
                    lastUpdate: lastActivity
                });
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
        await this.populateGame(event.game.game.id);
    };

    render() {
        const gamePlay = this.state.game;
        const game = (gamePlay || {}).game;
        const playedGdccIds = this.getPlayedGameDeckCardCollectionIds(gamePlay);

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-2">
                        <GameDetailWidget game={game} />

                        <GameUsersWidget
                            currentUserId={game ? game.currentUserId : null}
                            users={game ? game.users : null}
                        />

                        <GameHistoryWidget game={game} />
                    </div>

                    <DndProvider backend={HTML5Backend}>
                        <div className="col-lg-6">
                            <GameBoard
                                game={gamePlay}
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
