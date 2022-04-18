import { IGameDeckModel } from "../../clients/clients";
import { GameDeckCard } from "./GameDeckCard";

interface IGameDeckWidgetProps {
    gameDeck?: IGameDeckModel;
    excludeGameDeckCardCollectionIds?: number[];
}

export function GameDeckWidget(props: IGameDeckWidgetProps) {
    const egdccIds = props.excludeGameDeckCardCollectionIds;

    return (
        <div className="card">
            <h4 className="card-header">
                You
            </h4>
            <div className="card-body">
                <div className="card-text">
                    {props.gameDeck ?
                        (
                            <div id="current-deck" className="ch-cards">
                                {props.gameDeck.cardCollection.filter(x =>
                                    !!egdccIds === false || egdccIds.indexOf(x.id) === -1
                                ).map(x =>
                                    <GameDeckCard key={x.id} card={x} />
                                )}
                            </div>
                        )
                        :
                        (
                            <p>No deck selected</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
