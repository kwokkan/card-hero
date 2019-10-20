﻿import React from "react";
import { IGameDeckModel } from "../../clients/clients";
import { GameDeckCard } from "./GameDeckCard";

interface IGameDeckWidgetProps {
    gameDeck?: IGameDeckModel;
}

export function GameDeckWidget(props: IGameDeckWidgetProps) {
    return (
        <div className="card">
            <h4 className="card-header">
                <a>You</a>
            </h4>
            <div className="card-body">
                <div className="card-text">
                    {props.gameDeck ?
                        (
                            <div id="current-deck" className="ch-cards">
                                {props.gameDeck.cardCollection.map(x =>
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