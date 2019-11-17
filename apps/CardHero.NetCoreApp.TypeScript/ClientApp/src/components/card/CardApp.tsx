import React, { Component } from "react";
import { ICardModel } from "../../clients/clients";
import { Layout } from "../shared/Layout";
import { CardList } from "./CardList";
import { CardSearch } from "./CardSearch";

interface ICardAppState {
    cards: ICardModel[];
}

export class CardApp extends Component<any, ICardAppState> {
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
            <Layout
                sideContent={<CardSearch
                    onCardsPopulated={(x) => this.onCardsPopulated(x)} />
                }
            >
                <CardList cards={this.state.cards} />
            </Layout>
        );
    }
}