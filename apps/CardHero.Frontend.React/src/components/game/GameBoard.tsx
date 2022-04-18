import { ICardModel, IGamePlayModel, IMoveModel } from "../../clients/clients";
import { useAccountContext } from "../../contexts/AccountContextProvider";
import { useNotificationContext } from "../../contexts/NotificationContextProvider";
import { GamePlayService } from "../../services/GamePlayService";
import { run } from "../../utils/clientHelper";
import { GameBoardGrid, IGameBoardGridOnDropProps } from "./GameBoardGrid";

export interface IGameBoardOnUpdatedProps {
    gamePlay: IGamePlayModel;
}

interface IGameBoardProps {
    gamePlay: IGamePlayModel;
    onUpdated?: (event: IGameBoardOnUpdatedProps) => void;
}

const nullGameBoard = <p>No game selected</p>;

export function GameBoard(props: IGameBoardProps): JSX.Element {
    const { user } = useAccountContext();
    const notificationContext = useNotificationContext();

    const isSelected = (row: number, column: number, currentUserId: number): boolean => {
        return props.gamePlay.moves.findIndex((x: IMoveModel) => x.row === row && x.column === column && x.userId === currentUserId) > -1;
    }

    const getCardIdAtPosition = (row: number, column: number): number | null => {
        const move = props.gamePlay.moves.find((x: IMoveModel) => x.row === row && x.column === column);
        return move ? move.cardId : null;
    }

    const getCard = (cardId: number): ICardModel => {
        const card = props.gamePlay.playedCards.find((x: ICardModel) => x.id === cardId);
        return card;
    }

    const onCardDropped = async (data: IGameBoardGridOnDropProps) => {
        if (Constants.Debug) {
            console.log(data);
        }

        await run(notificationContext, async () => {
            await GamePlayService.move(props.gamePlay.game.id, data);

            if (props.onUpdated) {
                props.onUpdated({
                    gamePlay: props.gamePlay
                });
            }
        });
    }

    const getGameGrid = (data: IGamePlayModel, currentUserId: number): JSX.Element[] => {
        if (!data) {
            return null;
        }

        const grids: JSX.Element[] = [];
        let key = 0;

        for (let i = 0; i < data.game.rows; i++) {
            key++;

            for (let j = 0; j < data.game.columns; j++) {
                key++;

                const gameDeckCardCollectionId = getCardIdAtPosition(i, j);
                const card = getCard(gameDeckCardCollectionId);

                grids.push(
                    <GameBoardGrid
                        key={key}
                        row={i}
                        column={j}
                        card={card}
                        isSelected={isSelected(i, j, currentUserId)}
                        selectedClass="your-card"
                        nonSelectedClass="opponent-card"
                        gameDeckCardCollectionId={gameDeckCardCollectionId}
                        onDrop={(x) => onCardDropped(x)}
                    />
                );
            }
        }

        return grids;
    }

    const game = props.gamePlay;

    if (!game) {
        return nullGameBoard;
    }

    const grid = getGameGrid(game, user.id);

    return (
        <div id="current-game" className="card-text ch-cards game-cards" data-game-id={props.gamePlay.game.id}>
            {grid}
        </div>
    );
}
