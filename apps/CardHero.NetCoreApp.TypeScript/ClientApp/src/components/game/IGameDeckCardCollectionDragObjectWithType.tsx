import { DragObjectWithType } from "react-dnd";

export interface IGameDeckCardCollectionDragObjectWithType extends DragObjectWithType {
    gameDeckCardCollectionId: number;
}
