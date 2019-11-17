import React, { Component } from "react";
import { IDeckModel } from "../../clients/clients";
import { Layout } from "../shared/Layout";
import { DeckList } from "./DeckList";
import { DeckSearch } from "./DeckSearch";

interface IDeckAppState {
    decks: IDeckModel[];
}

export class DeckApp extends Component<any, IDeckAppState> {
    constructor(props) {
        super(props);

        this.state = { decks: [] };
    }

    onDecksPopulated(decks: IDeckModel[]) {
        if (Constants.Debug) {
            if (decks != null) {
                decks.forEach(deck => {
                    console.log(deck);
                });
            }
        }

        this.setState({
            decks: decks
        })
    }

    render() {
        return (
            <Layout
                sideContent={<DeckSearch
                    onDecksPopulated={(x) => this.onDecksPopulated(x)} />
                }
            >
                <DeckList decks={this.state.decks} />
            </Layout>
        );
    }
}