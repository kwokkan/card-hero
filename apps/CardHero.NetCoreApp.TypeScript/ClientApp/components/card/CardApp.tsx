import React, { Component, Fragment } from "react";
import { ICardModel } from "../../clients/clients";
import { CardList } from "./CardList";
import { CardSearch } from "./CardSearch";

interface ICardAppProps {
    routePrefix?: string;
}

interface ICardAppState {
    cards: ICardModel[];
}

export class CardApp extends Component<ICardAppProps, ICardAppState> {
    constructor(props: any) {
        super(props);

        this.state = { cards: [] };
    }

    onCardsPopulated(cards: ICardModel[]) {
        if (Constants.Debug) {
            if (cards != null) {
                cards.forEach(card => {
                    console.log(card);
                });
            }
        }

        this.setState({
            cards: cards
        })
    }

    render() {
        return (
            <Fragment>
                <div className="col-lg-2">
                    <CardSearch
                        onCardsPopulated={(x) => this.onCardsPopulated(x)} />
                </div>
                <div className="col-lg-10">
                    <CardList cards={this.state.cards} routePrefix={this.props.routePrefix} />
                </div>
            </Fragment>
        );
    }
}
