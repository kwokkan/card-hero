import React from "react";
import { useParams } from "react-router-dom";
import { Game } from "./Game";

export function GameRoute(): JSX.Element {
    const params = useParams();
    const id = params.id as unknown as number;

    return (
        <Game
            id={id}
        />
    );
}
