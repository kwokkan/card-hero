import React, { Component } from "react";
import { GameType, IGameViewModel } from "../../clients/clients";
import { GameTripleTriadBoard, IGameTripleTriadBoardOnUpdatedProps } from "./tripletriad/GameTripleTriadBoard";

export interface IGameBoardOnUpdatedProps {
    game: IGameViewModel;
}

interface IGameBoardProps {
    game: IGameViewModel;
    onUpdated?: (event: IGameBoardOnUpdatedProps) => void;
}

export class GameBoard extends Component<IGameBoardProps, {}> {
    static readonly nullGameBoard = <p>No game selected</p>;

    private onGameTripleTriadBoardUpdated = (event: IGameTripleTriadBoardOnUpdatedProps) => {
        if (this.props.onUpdated) {
            this.props.onUpdated({
                game: event.game
            });
        }
    };

    private getGameBoard(game: IGameViewModel): JSX.Element {
        if (!game) {
            return GameBoard.nullGameBoard;
        }

        switch (game.type) {
            case GameType.TripleTriad:
                return <GameTripleTriadBoard
                    game={game}
                    onUpdated={this.onGameTripleTriadBoardUpdated}
                />;
            default:
                return GameBoard.nullGameBoard;
        }
    }

    render() {
        const game = this.props.game;
        const gameBoard = this.getGameBoard(game);

        return gameBoard;
    }
}
