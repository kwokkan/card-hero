import React from "react";
import { IDeckModel } from "../../clients/clients";
import { Icon } from "../../styles/index";

interface IDeckDetailsWidgetProps {
    deck: IDeckModel;
}

export function DeckDetailsWidget(props: IDeckDetailsWidgetProps) {
    const deck = props.deck;

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">
                    {deck.name}
                    <Icon icon="star" className={"deck-favourite float-right" + (deck.isFavourited ? " enabled" : "")} data-deck-id={deck.id} />
                </h4>
                <p className="card-text">{deck.description}</p>
            </div>
            <div className="card-footer">
                <button type="button" id="save-deck" className="btn btn-success pull-right" data-deck-id={deck.id}>Save</button>
            </div>
        </div>
    );
}
