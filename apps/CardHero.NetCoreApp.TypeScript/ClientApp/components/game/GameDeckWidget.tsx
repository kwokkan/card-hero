import React from "react";
import { DeckModel } from "../../clients/clients";
import GameDeckCard from "./GameDeckCard";

interface IGameDeckWidgetProps {
    deck?: DeckModel;
}

export default function GameDeckWidget(props: IGameDeckWidgetProps) {
    return (
        <div className="card">
            <h4 className="card-header">
                <a>You</a>
            </h4>
            <div className="card-body">
                <div className="card-text">
                    {props.deck ?
                        (
                            <div id="current-deck" className="ch-cards" data-max-cards={props.deck.maxCards}>
                                {props.deck.cards.map(x =>
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