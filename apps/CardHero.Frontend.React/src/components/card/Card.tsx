import React, { PureComponent } from "react";
import { ICardModel } from "../../clients/clients";
import { CardService } from "../../services/CardService";
import { CardSecondaryStatsGraphWidget } from "./CardSecondaryStatsGraphWidget";
import { CardStatsGraphWidget } from "./CardStatsGraphWidget";
import { CardStatsWidget } from "./CardStatsWidget";

interface ICardProps {
    id: number;
}

interface ICardState {
    card?: ICardModel;
}

export class Card extends PureComponent<ICardProps, ICardState> {
    constructor(props: ICardProps) {
        super(props);

        this.state = {};
    }

    private onCardStatsFavourite = async (card: ICardModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        await CardService.favouriteCard(card.id);

        await this.populateCard(card.id);
    }

    private async populateCard(id: number) {
        const cards = await CardService.getCards({
            ids: [
                id
            ]
        });

        const card = cards[0];

        this.setState({ card: card });
    }

    async componentDidMount() {
        const cardId: number = this.props.id;

        await this.populateCard(cardId);
    }

    async componentWillReceiveProps(nextProps: ICardProps) {
        const cardId: number = this.props.id;

        if (nextProps.id !== cardId) {
            await this.populateCard(cardId);
        }
    }

    render() {
        const card = this.state.card;

        if (!card) {
            return null;
        }

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4">
                        <CardStatsWidget card={card} onFavourite={this.onCardStatsFavourite} />
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
}
