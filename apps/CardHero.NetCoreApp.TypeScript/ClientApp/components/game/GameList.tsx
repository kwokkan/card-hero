import React from "react";
import { Link } from "react-router-dom";
import GameModel from "../../models/GameModel";
import DateFormat from "../shared/DateFormat";

interface IGameListProps {
    games: GameModel[];
}

export default function GameList(props: IGameListProps) {
    return (
        <div className="row">
            <table className="table table-striped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Game</th>
                        <th>Start Time</th>
                    </tr>
                </thead>

                <tbody>
                    {props.games.map(g =>
                        <tr key={g.id}>
                            <th scope="row">
                                <Link to={'/' + g.id}>#{g.id}{' '}{g.name}</Link>
                            </th>
                            <td><DateFormat date={g.startTime} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}