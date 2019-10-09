import React, { Component } from "react";
import { GameModel, GameType } from "../../clients/clients";
import { GameTripleTriadBoard } from "./tripletriad/GameTripleTriadBoard";

interface IGameBoardProps {
    game: GameModel;
}

export class GameBoard extends Component<IGameBoardProps, any> {
    static readonly nullGameBoard = <p>No game selected</p>;

    constructor(props: IGameBoardProps) {
        super(props);
    }

    getGameBoard(): JSX.Element {
        if (!this.props.game) {
            return GameBoard.nullGameBoard;
        }

        switch (this.props.game.type) {
            case GameType.TripleTriad:
                return <GameTripleTriadBoard game={this.props.game} />;
            default:
                return GameBoard.nullGameBoard;
        }
    }

    render() {
        const gameBoard = this.getGameBoard();

        return (
            <div className="card">
                <div className="card-body">
                    {gameBoard}
                </div>
            </div>
        );
    }
}