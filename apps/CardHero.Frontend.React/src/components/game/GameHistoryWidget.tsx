import { Fragment } from "react";
import { IGameModel } from "../../clients/clients";
import { DateFormat } from "../shared/DateFormat";

interface IGameHistoryWidgetProps {
    game: IGameModel;
}

export function GameHistoryWidget(props: IGameHistoryWidgetProps) {
    const game = props.game;

    return (
        <div className="card">
            <h4 id="history-heading" className="card-header">
                <a href="#history-collapse" data-toggle="collapse" aria-expanded="true" aria-controls="history-collapse">History</a>
            </h4>
            <ul id="history-collapse" className="collapse show list-group list-group-flush" role="tabpanel" aria-labelledby="history-heading">
                <li className="list-group-item">
                    {game ?
                        (<Fragment>Game Started <DateFormat date={game.startTime} /></Fragment>)
                        :
                        'Unknown'
                    }
                </li>
            </ul>
        </div>
    );
}