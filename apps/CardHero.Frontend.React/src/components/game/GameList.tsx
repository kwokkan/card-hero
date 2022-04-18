import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { GameType, IDeckModel, IGameModel, IUserModel } from "../../clients/clients";
import { useAccountContext } from "../../contexts/AccountContextProvider";
import { GameService } from "../../services/GameService";
import { getRoutePrefix } from "../../utils/route";
import { DateFormat } from "../shared/DateFormat";
import { GameSelectDeckModal, IGameSelectDeckModalOnJoinedProps } from "./GameSelectDeckModal";

interface IGameListProps {
    games: IGameModel[];
    decks: IDeckModel[];
    routePrefix?: string;
}

export function GameList(props: IGameListProps): JSX.Element {
    const [modalShown, setModalShown] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<Nullable<IGameModel>>();

    const context = useAccountContext();

    const selectGame = (game: IGameModel) => {
        setModalShown(true);
        setSelectedGame(game);
    };

    const onHide = () => {
        setModalShown(false);
        setSelectedGame(null);
    };

    const onGameJoined = async (props: IGameSelectDeckModalOnJoinedProps) => {
        if (Constants.Debug) {
            console.log(props);
        }

        await GameService.join(props.gameId, props.deckId);
    };

    const renderRow = (game: IGameModel, routePrefix: string, user?: IUserModel): JSX.Element => {
        let canJoin = false;
        let canPlay = false;

        if (user && !game.endTime) {
            const userIds = game.userIds;
            canJoin = userIds.length < game.maxUsers && userIds.indexOf(user.id) === -1;
            canPlay = userIds.indexOf(user.id) > -1 && game.currentUserId === user.id;
        }

        const linkTo = routePrefix + game.id;

        return (
            <tr key={game.id}>
                <th scope="row">
                    <Link to={linkTo}>#{game.id}</Link>
                </th>
                <td>{GameType[game.type]}</td>
                <td><DateFormat date={game.startTime} /></td>
                {user &&
                    <td>
                        {canJoin &&
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => selectGame(game)}
                            >Join</button>
                        }
                        {canPlay &&
                            <Link
                                to={linkTo}
                                className="btn btn-primary"
                            >Play</Link>
                        }
                    </td>
                }
            </tr>
        );
    };

    const user = context.user;
    const routePrefix = getRoutePrefix(props.routePrefix);

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
                        {props.games.map(g =>
                            renderRow(g, routePrefix, user)
                        )}
                    </tbody>
                </table>
            </div>

            <GameSelectDeckModal
                show={modalShown}
                game={selectedGame}
                decks={props.decks}
                onHide={() => onHide()}
                onJoined={(props) => onGameJoined(props)}
            />
        </Fragment>
    );
}
