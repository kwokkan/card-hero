import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { GameType, IGameDeckModel, IGameViewModel } from "../../clients/clients";
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
    game?: IGameViewModel;
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

    private getPlayedGameDeckCardCollectionIds(game?: IGameViewModel): number[] {
        let playedGdccIds: number[];

        if (game && game.type === GameType.Standard) {
            const data = game.data;

            if (data) {
                playedGdccIds = data.moves.map(x => x.gameDeckCardCollectionId);
            }
        }

        return playedGdccIds;
    }

    private async populateGame(id: number) {
        const game = await GameService.getGameById(id);

        if (game) {
            if (this.state.lastUpdate < game.lastActivity) {
                this.setState({
                    game: game,
                    gameDeck: game.gameDeck,
                    lastUpdate: game.lastActivity
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
        await this.populateGame(event.game.id);
    };

    render() {
        const game = this.state.game;
        const playedGdccIds = this.getPlayedGameDeckCardCollectionIds(game);

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-2">
                        <GameDetailWidget game={game} />

                        <GameUsersWidget
                            currentGameUserId={game ? game.currentGameUserId : null}
                            users={game ? game.users : null}
                        />

                        <GameHistoryWidget game={game} />
                    </div>

                    <DndProvider backend={HTML5Backend}>
                        <div className="col-lg-6">
                            <GameBoard
                                game={game}
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
