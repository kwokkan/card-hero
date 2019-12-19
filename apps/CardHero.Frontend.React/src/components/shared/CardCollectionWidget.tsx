import React from "react";
import { ICardCollectionModel } from "../../clients/clients";

interface ICardCollectionWidgetProps {
    title?: string;
    cardCollection: ICardCollectionModel[];
}

export function CardCollectionWidget(props: ICardCollectionWidgetProps) {
    const cardCollection = props.cardCollection || [];

    return (
        <div className="card">
            <div className="card-body">
                {props.title &&
                    <h4 className="card-title">
                        {props.title}
                    </h4>
                }
                <div className="card-text">
                    <ul className="ch-cards droppable">
                        {cardCollection.map(cc =>
                            <li key={cc.id} className="ch-card draggable" data-card-collection-id={cc.id}>{cc.card.name}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
