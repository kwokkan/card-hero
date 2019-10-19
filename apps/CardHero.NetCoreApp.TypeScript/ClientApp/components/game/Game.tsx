import React, { Component } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { IGameDeckModel, IGameModel } from "../../clients/clients";
import { GameService } from "../../services/GameService";
import { Layout } from "../shared/Layout";
import { GameBoard } from "./GameBoard";
import { GameDeckWidget } from "./GameDeckWidget";
import { GameDetailWidget } from "./GameDetailWidget";
import { GameHistoryWidget } from "./GameHistoryWidget";

interface IGameProps {
    match?: any;
}

interface IGameState {
    game?: IGameModel;
    gameDeck?: IGameDeckModel;
}

export class Game extends Component<IGameProps, IGameState> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    private async populateGame(id: number) {
        const game = await GameService.getGameById(id);

        if (game) {
            this.setState({
                game: game,
                gameDeck: game.gameDeck
            });
        }
    }

    async componentDidMount() {
        const gameId: number = this.props.match.params.id;

        await this.populateGame(gameId);
    }

    async componentWillReceiveProps(nextProps: IGameProps) {
        const gameId: number = this.props.match.params.id;

        if (nextProps.match.params.id !== gameId) {
            await this.populateGame(gameId);
        }
    }

    render() {
        const game = this.state.game;

        return (
            <Layout>
                <DndProvider backend={HTML5Backend}>
                    <div className="row">
                        <div className="col-lg-3">
                            <GameDetailWidget game={game} />

                            <GameHistoryWidget game={game} />
                        </div>

                        <div className="col-lg-6">
                            <GameBoard game={game}>
                            </GameBoard>
                        </div>

                        <div className="col-lg-3">
                            <GameDeckWidget
                                gameDeck={this.state.gameDeck}
                            />
                        </div>
                    </div>
                </DndProvider>
            </Layout>
        );
    }
}