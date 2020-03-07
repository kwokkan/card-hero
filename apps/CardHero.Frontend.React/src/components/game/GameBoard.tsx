import React, { Component } from "react";
import { ICardModel, IGamePlayModel, IMoveModel } from "../../clients/clients";
import { GamePlayService } from "../../services/GamePlayService";
import { GameBoardGrid, IGameBoardGridOnDropProps } from "./GameBoardGrid";

export interface IGameBoardOnUpdatedProps {
    gamePlay: IGamePlayModel;
}

interface IGameBoardProps {
    gamePlay: IGamePlayModel;
    onUpdated?: (event: IGameBoardOnUpdatedProps) => void;
}

export class GameBoard extends Component<IGameBoardProps, {}> {
    static readonly nullGameBoard = <p>No game selected</p>;

    private isSelected(row: number, column: number): boolean {
        return this.props.gamePlay.moves.findIndex((x: IMoveModel) => x.row === row && x.column === column) > -1;
    }

    private getCardIdAtPosition(row: number, column: number): number | null {
        const move = this.props.gamePlay.moves.find((x: IMoveModel) => x.row === row && x.column === column);
        return move ? move.cardId : null;
    }

    private getCard(cardId: number): ICardModel {
        const card = this.props.gamePlay.playedCards.find((x: ICardModel) => x.id === cardId);
        return card;
    }

    private async onCardDropped(data: IGameBoardGridOnDropProps) {
        if (Constants.Debug) {
            console.log(data);
        }

        await GamePlayService.move(this.props.gamePlay.game.id, data);

        if (this.props.onUpdated) {
            this.props.onUpdated({
                gamePlay: this.props.gamePlay
            });
        }
    }

    private getGameGrid(data: IGamePlayModel): JSX.Element[] {
        if (!data) {
            return null;
        }

        const grids: JSX.Element[] = [];
        let key = 0;

        for (var i = 0; i < data.game.rows; i++) {
            key++;

            for (var j = 0; j < data.game.columns; j++) {
                key++;

                const gameDeckCardCollectionId = this.getCardIdAtPosition(i, j);
                const card = this.getCard(gameDeckCardCollectionId);

                grids.push(
                    <GameBoardGrid
                        key={key}
                        row={i}
                        column={j}
                        card={card}
                        isSelected={this.isSelected(i, j)}
                        gameDeckCardCollectionId={gameDeckCardCollectionId}
                        onDrop={(x) => this.onCardDropped(x)}
                    />
                );
            }
        }

        return grids;
    }

    render() {
        const game = this.props.gamePlay;

        if (!game) {
            return GameBoard.nullGameBoard;
        }

        const grid = this.getGameGrid(game);

        return (
            <div id="current-game" className="card-text ch-cards game-cards" data-game-id={this.props.gamePlay.game.id}>
                {grid}
            </div>
        );
    }
}
