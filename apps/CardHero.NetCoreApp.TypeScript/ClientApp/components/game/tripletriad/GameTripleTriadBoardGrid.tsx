﻿import React from "react";
import { useDrop } from 'react-dnd';
import { ICardModel } from "../../../clients/clients";
import { CardWidget } from "../../shared/CardWidget";
import { DragType } from "../../shared/DragType";

export interface IGameTripleTriadBoardGridOnDropProps {
    row: number;
    column: number;
    gameDeckCardCollectionId: number;
}

interface IGameTripleTriadBoardGridProps {
    row: number;
    column: number;
    card: ICardModel;
    isSelected: boolean;

    onDrop?: (data: IGameTripleTriadBoardGridOnDropProps) => void;
}

export const GameTripleTriadBoardGrid: React.FC<IGameTripleTriadBoardGridProps> = (props: IGameTripleTriadBoardGridProps) => {
    const [{ isOver }, drop] = useDrop({
        accept: DragType.Card.toString(),
        drop: (item) => {
            if (props.onDrop) {
                props.onDrop({
                    row: props.row,
                    column: props.column,
                    gameDeckCardCollectionId: item.gameDeckCardCollectionId
                });
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={'card col-4 d-inline-block ch-card game-card' + (props.isSelected ? ' selected' : '') + (isOver ? ' bg-primary' : '')}
            data-row={props.row}
            data-column={props.column}
        >
            <div className="card-body">
                {props.card &&
                    <CardWidget card={props.card} />
                }
            </div>
        </div>
    );
};
