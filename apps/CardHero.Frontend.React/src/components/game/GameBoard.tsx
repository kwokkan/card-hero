import React, { Component } from "react";
import { ICardModel, IGameDataViewModel, IGameMoveViewModel, IGameViewModel } from "../../clients/clients";
import { GameService } from "../../services/GameService";
import { GameBoardGrid, IGameBoardGridOnDropProps } from "./GameBoardGrid";

export interface IGameBoardOnUpdatedProps {
    game: IGameViewModel;
}

interface IGameBoardProps {
    game: IGameViewModel;
    onUpdated?: (event: IGameBoardOnUpdatedProps) => void;
}

export class GameBoard extends Component<IGameBoardProps, {}> {
    static readonly nullGameBoard = <p>No game selected</p>;

    private isSelected(row: number, column: number): boolean {
        return this.props.game.data.moves.findIndex((x: IGameMoveViewModel) => x.row === row && x.column === column) > -1;
    }

    private getCardIdAtPosition(row: number, column: number): number | null {
        const move = this.props.game.data.moves.find((x: IGameMoveViewModel) => x.row === row && x.column === column);
        return move ? move.cardId : null;
    }

    private getCard(cardId: number): ICardModel {
        const card = this.props.game.data.playedCards.find((x: ICardModel) => x.id === cardId);
        return card;
    }

    private async onCardDropped(data: IGameBoardGridOnDropProps) {
        if (Constants.Debug) {
            console.log(data);
        }

        await GameService.move(this.props.game.id, data);

        if (this.props.onUpdated) {
            this.props.onUpdated({
                game: this.props.game
            });
        }
    }

    private getGameGrid(data: IGameDataViewModel): JSX.Element[] {
        if (!data) {
            return null;
        }

        const grids: JSX.Element[] = [];
        let key = 0;

        for (var i = 0; i < data.rows; i++) {
            key++;

            for (var j = 0; j < data.columns; j++) {
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
        const game = this.props.game;

        if (!game) {
            return GameBoard.nullGameBoard;
        }

        const data = game.data;
        const grid = this.getGameGrid(data);

        return (
            <div id="current-game" className="card-text ch-cards game-cards" data-game-id={this.props.game.id}>
                {grid}
            </div>
        );
    }
}
