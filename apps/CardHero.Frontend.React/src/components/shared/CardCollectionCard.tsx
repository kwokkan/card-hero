import React from "react";
import { ICardCollectionModel, Rarity } from "../../clients/clients";
import { Icon } from "../../styles";

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
            <span>
                {card.card.name}
                {" "}
                <span className={"text-rarity_" + Rarity[card.card.rarity].toLowerCase()} title={Rarity[card.card.rarity]}>
                    {Array(card.card.rarity).fill(0).map((_, i) =>
                        <Icon key={i} icon="star" />
                    )}
                </span>
            </span>

            {props.actionName &&
                <button type="button" className={actionClassName} disabled={props.actionDisabled} onClick={onActionClicked}>
                    {props.actionName}
                </button>
            }
        </div>
    );
}
