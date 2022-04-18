import { GameType, IGameModel } from "../../clients/clients";
import { DateFormat } from "../shared/DateFormat";

interface IGameDetailWidgetProps {
    game: IGameModel;
}

export function GameDetailWidget(props: IGameDetailWidgetProps) {
    const game = props.game;

    return (
        <div className="card">
            <h4 className="card-header">
                {game ?
                    (<span>#{game.id}</span>)
                    :
                    (<span>Unknown</span>)
                }
            </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <strong>Type:</strong>
                    {' '}
                    {game ?
                        (<span>{GameType[game.type]}</span>)
                        :
                        (<span>Unknown</span>)
                    }
                </li>
                <li className="list-group-item">
                    <strong>Start Time:</strong>
                    {' '}
                    {game ?
                        (<DateFormat date={game.startTime} />)
                        :
                        (<span>Unknown</span>)
                    }
                </li>
            </ul>
        </div>
    );
}
