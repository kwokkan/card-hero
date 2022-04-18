import { Fragment, useState } from "react";
import { IDeckModel } from "../../clients/clients";
import { DeckList } from "./DeckList";
import { DeckSearch } from "./DeckSearch";

interface IDeckAppProps {
    routePrefix?: string;
}

export function DeckApp(props: IDeckAppProps): JSX.Element {
    const [decks, setDecks] = useState<IDeckModel[]>([]);

    const onDecksPopulated = (decks: IDeckModel[]) => {
        if (Constants.Debug) {
            if (decks != null) {
                decks.forEach(deck => {
                    console.log(deck);
                });
            }
        }

        setDecks(decks);
    };

    return (
        <Fragment>
            <div className="col-lg-2">
                <DeckSearch
                    onDecksPopulated={(x) => onDecksPopulated(x)} />
            </div>
            <div className="col-lg-10">
                <DeckList decks={decks} routePrefix={props.routePrefix} />
            </div>
        </Fragment>
    );
}
