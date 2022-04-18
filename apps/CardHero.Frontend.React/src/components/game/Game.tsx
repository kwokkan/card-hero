import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GameType, IGameDeckModel, IGamePlayModel } from "../../clients/clients";
import { useAccountContext } from "../../contexts/AccountContextProvider";
import { getGameBannerMessage } from "../../helpers/gameBannerHelpers";
import { GamePlayService } from "../../services/GamePlayService";
import { GameBanner } from "./GameBanner";
import { GameBoard, IGameBoardOnUpdatedProps } from "./GameBoard";
import { GameDeckWidget } from "./GameDeckWidget";
import { GameDetailWidget } from "./GameDetailWidget";
import { GameHistoryWidget } from "./GameHistoryWidget";
import { GameUsersWidget } from "./GameUsersWidget";

interface IGameProps {
    id: number;
}

export function Game(props: IGameProps): JSX.Element {
    const [gamePlay, setGamePlay] = useState<Nullable<IGamePlayModel>>();
    const [gameDeck, setGameDeck] = useState<Nullable<IGameDeckModel>>();
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(0));

    const context = useAccountContext();

    const _interval = useRef<number>();

    const getPlayedGameDeckCardCollectionIds = (gamePlay?: IGamePlayModel): number[] => {
        let playedGdccIds: number[];

        if (gamePlay && gamePlay.game.type === GameType.Standard) {
            playedGdccIds = gamePlay.moves.map(x => x.gameDeckCardCollectionId);
        }

        return playedGdccIds;
    };

    const populateGame = async (id: number) => {
        const gamePlay = await GamePlayService.getGamePlayById(id);

        if (gamePlay) {
            const game = gamePlay.game;

            const lastActivity = new Date(game.startTime.getTime() + gamePlay.moves.length);

            if (lastUpdate < lastActivity) {
                setGamePlay(gamePlay);
                setGameDeck(gamePlay.gameDeck);
                setLastUpdate(lastActivity);
            }

            if (game.endTime) {
                window.clearInterval(_interval.current);
            }
        }
    };

    useEffect(() => {
        async function load() {
            const gameId: number = props.id;

            await populateGame(gameId);

            _interval.current = window.setInterval(async () => {
                await populateGame(gameId);
            }, 5000);
        }

        load();

        return () => {
            window.clearInterval(_interval.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);
    
    const onGameBoardUpdated = async (event: IGameBoardOnUpdatedProps) => {
        await populateGame(event.gamePlay.game.id);
    };

    const game = (gamePlay || {}).game;
    const playedGdccIds = getPlayedGameDeckCardCollectionIds(gamePlay);

    const user = context.user;
    const gameBanner = getGameBannerMessage(game, user);

    return (
        <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-2">
                    <GameDetailWidget game={game} />

                    <GameUsersWidget
                        currentUserId={game ? game.currentUserId : null}
                        userIds={game ? game.userIds : null}
                    />

                    <GameHistoryWidget game={game} />
                </div>

                <DndProvider backend={HTML5Backend}>
                    <div className="col-lg-6">
                        <GameBanner visible={gameBanner.shouldDisplay} message={gameBanner.message} additionalClasses={gameBanner.additionalClass} />

                        <GameBoard
                            gamePlay={gamePlay}
                            onUpdated={onGameBoardUpdated}
                        />
                    </div>

                    <div className="col-lg-2">
                        <GameDeckWidget
                            gameDeck={gameDeck}
                            excludeGameDeckCardCollectionIds={playedGdccIds}
                        />
                    </div>
                </DndProvider>
            </div>
        </div>
    );
}
