import React, { Component } from "react";
import { GameTripleTriadMoveViewModel, ICardModel, IGameViewModel } from "../../../clients/clients";
import { GameTripleTriadModel } from "../../../models/GameTripleTriadModel";
import { GameService } from "../../../services/GameService";
import { GameTripleTriadBoardGrid, IGameTripleTriadBoardGridOnDropProps } from "./GameTripleTriadBoardGrid";

export interface IGameTripleTriadBoardOnUpdatedProps {
    game: IGameViewModel;
}

interface IGameTripleTriadBoardProps {
    game: IGameViewModel;
    onUpdated?: (event: IGameTripleTriadBoardOnUpdatedProps) => void;
}

export class GameTripleTriadBoard extends Component<IGameTripleTriadBoardProps, any> {
    constructor(props: IGameTripleTriadBoardProps) {
        super(props);
    }

    private isSelected(row: number, column: number): boolean {
        return this.props.game.data.moves.findIndex(x => x.row === row && x.column === column) > -1;
    }

    private getCardIdAtPosition(row: number, column: number): number | null {
        const move = this.props.game.data.moves.find(x => x.row === row && x.column === column);
        return move ? move.cardId : null;
    }

    private getCard(cardId: number): ICardModel {
        const card = this.props.game.data.playedCards.find(x => x.id == cardId);
        return card;
    }

    private async onCardDropped(data: IGameTripleTriadBoardGridOnDropProps) {
        if (Constants.Debug) {
            console.log(data);
        }

        await GameService.move(this.props.game.id, new GameTripleTriadMoveViewModel(data));

        if (this.props.onUpdated) {
            this.props.onUpdated({
                game: this.props.game
            });
        }
    }

    private getGameGrid(data: GameTripleTriadModel): JSX.Element[] {
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
                    <GameTripleTriadBoardGrid
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
        const data = this.props.game.data;
        const grid = this.getGameGrid(data);

        return (
            <div id="current-game" className="card-text ch-cards game-cards" data-game-id={this.props.game.id}>
                {grid}
            </div>
        );
    }
}