import { useEffect, useState } from "react";
import { ICardModel } from "../../clients/clients";
import { CardService } from "../../services/CardService";
import { CardSecondaryStatsGraphWidget } from "./CardSecondaryStatsGraphWidget";
import { CardStatsGraphWidget } from "./CardStatsGraphWidget";
import { CardStatsWidget } from "./CardStatsWidget";

interface ICardProps {
    id: number;
}

export function Card(props: ICardProps): JSX.Element | null {
    const [card, setCard] = useState<ICardModel>();

    const onCardStatsFavourite = async (card: ICardModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        await CardService.favouriteCard(card.id);

        await populateCard(card.id);
    }

    const populateCard = async (id: number) => {
        const cards = await CardService.getCards({
            ids: [
                id
            ]
        });

        setCard(cards[0]);
    }

    useEffect(() => {
        async function load() {
            await populateCard(props.id);
        };

        load();
    }, [props.id]);

    if (!card) {
        return null;
    }

    return (
        <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-4">
                    <CardStatsWidget card={card} onFavourite={onCardStatsFavourite} />
                </div>
                <div className="col-lg-4">
                    <CardStatsGraphWidget card={card} />
                </div>
                <div className="col-lg-4">
                    <CardSecondaryStatsGraphWidget card={card} />
                </div>
            </div>
        </div>
    );
}
