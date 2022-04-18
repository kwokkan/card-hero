import { Fragment, useEffect, useState } from "react";
import { IDeckModel, IGameModel } from "../../clients/clients";
import { DeckService } from "../../services/DeckService";
import { GameList } from "./GameList";
import { GameSearch } from "./GameSearch";

interface IGameAppProps {
    routePrefix?: string;
}

export function GameApp(props: IGameAppProps): JSX.Element {
    const [games, setGames] = useState<IGameModel[]>([]);
    const [decks, setDecks] = useState<IDeckModel[]>([]);

    const getDecks = async () => {
        const decks = await DeckService.getDecks();

        if (Constants.Debug) {
            if (decks != null) {
                decks.forEach(deck => {
                    console.log(deck);
                })
            }
        }

        setDecks(decks);
    };

    useEffect(() => {
        async function load() {
            await getDecks();
        }

        load();
    }, []);

    const onGamesPopulated = (games: IGameModel[]) => {
        if (Constants.Debug) {
            if (games != null) {
                games.forEach(game => {
                    console.log(game);
                });
            }
        }

        setGames(games);
    };

    return (
        <Fragment>
            <div className="col-lg-2">
                <GameSearch
                    decks={decks}
                    onGamesPopulated={(x) => onGamesPopulated(x)} />
            </div>
            <div className="col-lg-10">
                <GameList
                    games={games}
                    decks={decks}
                    routePrefix={props.routePrefix}
                />
            </div>
        </Fragment>
    );
}
