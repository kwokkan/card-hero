import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../contexts/AccountContext";
import GameModel from "../../models/GameModel";
import GameType from "../../models/GameType";
import DateFormat from "../shared/DateFormat";

interface IGameListProps {
    games: GameModel[];
}

export default function GameList(props: IGameListProps) {
    const context = useContext(AccountContext);
    const user = context.user;

    return (
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
    );
}