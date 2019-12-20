import React from "react";
import { ICardCollectionModel } from "../../clients/clients";

interface ICardCollectionCardProps {
    card: ICardCollectionModel;
    actionName?: string;
    onActionClicked?: (card: ICardCollectionModel) => void;
    actionDisabled?: boolean;
    actionClassName?: string;
}

export function CardCollectionCard(props: ICardCollectionCardProps) {
    const card = props.card;

    const onActionClicked = () => {
        if (props.onActionClicked) {
            props.onActionClicked(props.card);
        }
    };

    const actionClassName = "btn btn-sm " + (props.actionClassName || "");

    return (
        <div className="list-group-item d-flex justify-content-between align-items-center" data-card-collection-id={card.id}>
            {card.card.name}

            {props.actionName &&
                <button type="button" className={actionClassName} disabled={props.actionDisabled} onClick={onActionClicked}>
                    {props.actionName}
                </button>
            }
        </div>
    );
}
