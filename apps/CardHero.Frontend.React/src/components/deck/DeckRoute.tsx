import React from "react";
import { useParams } from "react-router-dom";
import { Deck } from "./Deck";

export function DeckRoute(): JSX.Element {
    const params = useParams();
    const id = params.id as unknown as number;

    return (
        <Deck
            id={id}
        />
    );
}
