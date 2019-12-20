﻿import React from "react";
import { IDeckModel } from "../../clients/clients";
import { Icon } from "../../styles/index";

interface IDeckDetailsWidgetProps {
    deck: IDeckModel;
    onSaveClicked?: (deck: IDeckModel) => void;
}

export function DeckDetailsWidget(props: IDeckDetailsWidgetProps): JSX.Element {
    const deck = props.deck;

    const onSavedClicked = () => {
        if (props.onSaveClicked) {
            props.onSaveClicked(props.deck)
        }
    };

    return (
        <div className="card">
            <h4 className="card-header">
                {deck.name}
                <Icon icon="star" className={"deck-favourite float-right" + (deck.isFavourited ? " enabled" : "")} data-deck-id={deck.id} />
            </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <strong>Description:</strong>
                    {" "}
                    <span >{deck.description}</span>
                </li>

                <li className="list-group-item">
                    <strong>Max cards:</strong>
                    {" "}
                    <span>{deck.maxCards}</span>
                </li>
            </ul>
            <div className="card-footer">
                <button type="button" id="save-deck" className="btn btn-success pull-right" onClick={onSavedClicked} data-deck-id={deck.id}>Save</button>
            </div>
        </div>
    );
}
