import React from "react";
import { GameModel } from "../../clients/clients";
import DateFormat from "../shared/DateFormat";

interface IGameHistoryWidgetProps {
    game: GameModel;
}

export default function GameHistoryWidget(props: IGameHistoryWidgetProps) {
    const game = props.game;

    return (
        <div className="card">
            <h4 id="history-heading" className="card-header">
                <a href="#history-collapse" data-toggle="collapse" aria-expanded="true" aria-controls="history-collapse">History</a>
            </h4>
            <div className="card-body">
                <div className="card-text">
                    <div id="history-collapse" className="collapse show" role="tabpanel" aria-labelledby="history-heading">
                        <ul>
                            {game ?
                                (<li>Game Started at <DateFormat date={game.startTime} /></li>)
                                :
                                (<li>Unknown</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}