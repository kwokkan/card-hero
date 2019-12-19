import React from "react";
import { ICardCollectionModel } from "../../clients/clients";

interface ICardCollectionCardProps {
    className?: string;
    card: ICardCollectionModel
}

export function CardCollectionCard(props: ICardCollectionCardProps) {
    const card = props.card;

    return (
        <div className={props.className} data-card-collection-id={card.id}>
            {card.card.name}
        </div>
    );
}
