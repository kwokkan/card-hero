import React from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { CardCollectionCard } from "./CardCollectionCard";

interface ICardCollectionWidgetProps {
    title?: string;
    cardCollection: ICardCollectionModel[];
    maxCards?: number;
    cardActionName?: string;
    onCardClicked?: (card: ICardCollectionModel) => void;
    cardActionDisabled?: boolean;
    cardActionClassName?: string;
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
            <div className="list-group list-group-flush">
                {cardCollection.length > 0 ?
                    (cardCollection.map(cc =>
                        <CardCollectionCard
                            key={cc.id}
                            card={cc}
                            actionName={props.cardActionName}
                            onActionClicked={props.onCardClicked}
                            actionDisabled={props.cardActionDisabled}
                            actionClassName={props.cardActionClassName}
                        />
                    ))
                    :
                    (
                        <div className="list-group-item">
                            No cards
                        </div>
                    )
                }
            </div>
        </div>
    );
}
