import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { GameType, IDeckModel, IGameModel, IUserModel } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";
import { GameService } from "../../services/GameService";
import { getRoutePrefix } from "../../utils/route";
import { DateFormat } from "../shared/DateFormat";
import { GameSelectDeckModal, IGameSelectDeckModalOnJoinedProps } from "./GameSelectDeckModal";

interface IGameListProps {
    games: IGameModel[];
    decks: IDeckModel[];
    routePrefix?: string;
}

interface IGameListState {
    modalShown: boolean;
    selectedGame?: IGameModel;
}

export class GameList extends Component<IGameListProps, IGameListState> {
    static contextType = AccountContext;

    constructor(props: IGameListProps) {
        super(props);

        this.state = {
            modalShown: false
        };
    }

    selectGame(game: IGameModel) {
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

    private renderRow(game: IGameModel, routePrefix: string, user?: IUserModel): JSX.Element {
        let canJoin = false;
        let canPlay = false;

        if (user && !game.endTime) {
            const userIds = game.userIds;
            canJoin = userIds.length < game.maxUsers && userIds.indexOf(user.id) === -1;
            canPlay = userIds.indexOf(user.id) > -1 && game.currentUserId === user.id;
        }

        return (
            <tr key={game.id}>
                <th scope="row">
                    <Link to={routePrefix + game.id}>#{game.id}</Link>
                </th>
                <td>{GameType[game.type]}</td>
                <td><DateFormat date={game.startTime} /></td>
                {user &&
                    <td>
                        {canJoin &&
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => this.selectGame(game)}
                            >Join</button>
                        }
                        {canPlay &&
                            <button
                                type="button"
                                className="btn btn-primary"
                            >Play</button>
                        }
                    </td>
                }
            </tr>
        );
    }

    render() {
        const user = this.context.user;
        const routePrefix = getRoutePrefix(this.props.routePrefix);

        return (
            <Fragment>
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
                                this.renderRow(g, routePrefix, user)
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
            </Fragment>
        );
    }
}
