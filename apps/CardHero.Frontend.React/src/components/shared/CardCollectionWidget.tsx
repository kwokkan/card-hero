import React from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { CardCollectionCard } from "./CardCollectionCard";

interface ICardCollectionWidgetProps {
    title?: string;
    cardCollection: ICardCollectionModel[];
}

export function CardCollectionWidget(props: ICardCollectionWidgetProps) {
    const cardCollection = props.cardCollection || [];

    return (
        <div className="card">
            {props.title &&
                <h4 className="card-header">
                    {props.title}
                </h4>
            }
            <div className="card-body">
                <div className="card-text ch-cards droppable">
                    {cardCollection.map(cc =>
                        <CardCollectionCard key={cc.id} className="ch-card draggable" card={cc} />
                    )}
                </div>
            </div>
        </div>
    );
}
