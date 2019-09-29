import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DeckModel, GameType } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";
import GameModel from "../../models/GameModel";
import GameService from "../../services/GameService";
import DateFormat from "../shared/DateFormat";
import GameSelectDeckModal, { IGameSelectDeckModalOnJoinedProps } from "./GameSelectDeckModal";

interface IGameListProps {
    games: GameModel[];
    decks: DeckModel[];
}

interface IGameListState {
    modalShown: boolean;
    selectedGame?: GameModel;
}

export default class GameList extends Component<IGameListProps, IGameListState> {
    static contextType = AccountContext;

    constructor(props: IGameListProps) {
        super(props);

        this.state = {
            modalShown: false
        };
    }

    selectGame(game: GameModel) {
        this.setState({
            modalShown: true,
            selectedGame: game
        });
    }

    onHide() {
        this.setState({
            modalShown: false,
            selectedGame: null
        })
    }

    async onGameJoined(props: IGameSelectDeckModalOnJoinedProps) {
        if (Constants.Debug) {
            console.log(props);
        }

        await GameService.join(props.gameId, props.deckId);
    }

    render() {
        const user = this.context.user;

        return (
            <>
                <div className="row">
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Game</th>
                                <th>Type</th>
                                <th>Start Time</th>
                                {user &&
                                    <td></td>
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.games.map(g =>
                                <tr key={g.id as any}>
                                    <th scope="row">
                                        <Link to={'/' + g.id}>#{g.id}{' '}{g.name}</Link>
                                    </th>
                                    <td>{GameType[g.type]}</td>
                                    <td><DateFormat date={g.startTime} /></td>
                                    {user &&
                                        <td>
                                            {g.canJoin &&
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() => this.selectGame(g)}
                                                >Join</button>
                                            }
                                            {g.canPlay &&
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                >Play</button>
                                            }
                                        </td>
                                    }
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <GameSelectDeckModal
                    show={this.state.modalShown}
                    game={this.state.selectedGame}
                    decks={this.props.decks}
                    onHide={() => this.onHide()}
                    onJoined={(props) => this.onGameJoined(props)}
                />
            </>
        );
    }
}