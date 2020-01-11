import React from "react";
import { useDrop } from "react-dnd";
import { ICardModel } from "../../clients/clients";
import { CardWidget } from "../shared/CardWidget";
import { DragType } from "../shared/DragType";
import { IGameDeckCardCollectionDragObjectWithType } from "./IGameDeckCardCollectionDragObjectWithType";

export interface IGameBoardGridOnDropProps {
    row: number;
    column: number;
    gameDeckCardCollectionId: number;
}

interface IGameBoardGridProps {
    row: number;
    column: number;
    card: ICardModel;
    isSelected: boolean;
    gameDeckCardCollectionId?: number;

    onDrop?: (data: IGameBoardGridOnDropProps) => void;
}

export const GameBoardGrid: React.FC<IGameBoardGridProps> = (props: IGameBoardGridProps) => {
    //TODO: fix types
    const [{ isOver }, drop] = useDrop({
        accept: DragType.Card.toString(),
        drop: (item: IGameDeckCardCollectionDragObjectWithType) => {
            if (props.onDrop) {
                props.onDrop({
                    row: props.row,
                    column: props.column,
                    gameDeckCardCollectionId: item.gameDeckCardCollectionId
                });
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={'game-card' + (props.isSelected ? ' selected' : '') + (isOver ? ' bg-primary' : '')}
            data-row={props.row}
            data-column={props.column}
            data-game-deck-card-collection-id={props.gameDeckCardCollectionId}
        >
            {props.card &&
                <CardWidget card={props.card} />
            }
        </div>
    );
};
