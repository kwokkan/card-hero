import { Fragment, useState } from "react";
import { ICardModel } from "../../clients/clients";
import { CardList } from "./CardList";
import { CardSearch } from "./CardSearch";

interface ICardAppProps {
    routePrefix?: string;
}

export function CardApp(props: ICardAppProps): JSX.Element {
    const [cards, setCards] = useState<ICardModel[]>([]);

    const onCardsPopulated = (cards: ICardModel[]) => {
        if (Constants.Debug) {
            if (cards != null) {
                cards.forEach(card => {
                    console.log(card);
                });
            }
        }

        setCards(cards);
    }

    return (
        <Fragment>
            <div className="col-lg-2">
                <CardSearch
                    onCardsPopulated={(x) => onCardsPopulated(x)} />
            </div>
            <div className="col-lg-10">
                <CardList cards={cards} routePrefix={props.routePrefix} />
            </div>
        </Fragment>
    );
}
