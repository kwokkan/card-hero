import React from "react";
import { useDrag } from 'react-dnd';
import { DeckCardModel } from "../../clients/clients";
import { CardWidget } from "../shared/CardWidget";
import DragType from "../shared/DragType";

interface IGameDeckCardProps {
    card: DeckCardModel;
}

export default function GameDeckCard(props: IGameDeckCardProps) {
    const dc = props.card;
    //TODO: replace later when model has property
    const isUsable = true;

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: DragType.Card.toString(),
            cardCollectionId: dc.cardCollectionId
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    return (
        <div
            ref={drag}
            className={'current-card' + (isUsable ? '' : ' bg-secondary text-white disabled') + (isDragging ? ' bg-primary' : '')}
            data-card-collection-id={dc.cardCollectionId}
        >
            <CardWidget card={dc} />
        </div>
    );
}