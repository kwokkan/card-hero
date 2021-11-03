import React from "react";
import { useDrag } from "react-dnd";
import { IGameDeckCardCollectionModel } from "../../clients/clients";
import { CardWidget } from "../shared/CardWidget";
import { DragType } from "../shared/DragType";

interface IGameDeckCardProps {
    card: IGameDeckCardCollectionModel;
}

export function GameDeckCard(props: IGameDeckCardProps) {
    const dc = props.card;
    //TODO: replace later when model has property
    const isUsable = true;

    const [{ isDragging }, drag] = useDrag({
        type: DragType.Card.toString(),
        item: {
            type: DragType.Card.toString(),
            gameDeckCardCollectionId: dc.id
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className={'current-card' + (isUsable ? '' : ' bg-secondary text-white disabled') + (isDragging ? ' bg-primary' : '')}
            data-game-deck-card-collection-id={dc.id}
        >
            <CardWidget card={dc.card} />
        </div>
    );
}
