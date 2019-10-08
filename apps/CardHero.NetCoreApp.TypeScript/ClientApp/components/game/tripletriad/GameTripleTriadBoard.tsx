import React, { Component } from "react";
import { CardModel, GameTripleTriadMoveViewModel, GameViewModel } from "../../../clients/clients";
import GameTripleTriadModel from "../../../models/GameTripleTriadModel";
import GameService from "../../../services/GameService";
import GameTripleTriadBoardGrid, { IGameTripleTriadBoardGridOnDropProps } from "./GameTripleTriadBoardGrid";

interface IGameTripleTriadBoardProps {
    game: GameViewModel;
}

interface IGameTripleTriadBoardState {
    data: GameTripleTriadModel;
}

export default class GameTripleTriadBoard extends Component<IGameTripleTriadBoardProps, IGameTripleTriadBoardState> {
    constructor(props: IGameTripleTriadBoardProps) {
        super(props);

        this.state = {
            data: props.game.data
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.game.data
        });
    }

    private isSelected(row: number, column: number): boolean {
        return this.state.data.moves.findIndex(x => x.row === row && x.column === column) > -1;
    }

    private getCardCollectionId(row: number, column: number): number | null {
        const move = this.state.data.moves.find(x => x.row === row && x.column === column);
        return move ? move.cardCollectionId : null;
    }

    private getCardCollectionCard(cardCollectionId: number): CardModel {
        const card = this.props.game.gameDeck.cardCollection.find(x => x.id === cardCollectionId);
        return card;
    }

    private async onCardDropped(data: IGameTripleTriadBoardGridOnDropProps) {
        if (Constants.Debug) {
            console.log(data);
        }

        await GameService.move(this.props.game.id, new GameTripleTriadMoveViewModel(data));

        //TODO: update moves array
    }

    private getGameGrid(): JSX.Element[] {
        const grids: JSX.Element[] = [];
        const data = this.state.data;
        let key = 0;

        for (var i = 0; i < data.rows; i++) {
            key++;

            for (var j = 0; j < data.columns; j++) {
                key++;

                const cardCollectionId = this.getCardCollectionId(i, j);
                const card = this.getCardCollectionCard(cardCollectionId);

                grids.push(
                    <GameTripleTriadBoardGrid
                        key={key}
                        row={i}
                        column={j}
                        card={card}
                        isSelected={this.isSelected(i, j)}
                        onDrop={(x) => this.onCardDropped(x)}
                    />
                );
            }
        }

        return grids;
    }

    render() {
        const grid = this.state.data ? this.getGameGrid() : null;

        return (
            <div id="current-game" className="card-text ch-cards game-cards" data-game-id={this.props.game.id}>
                {grid}
            </div>
        );
    }
}