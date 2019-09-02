import React, { Component } from "react";
import Constants from "../../constants/constants";
import DeckModel from "../../models/DeckModel";
import Layout from "../shared/Layout";
import DeckList from "./DeckList";
import DeckSearch from "./DeckSearch";

interface IDeckAppState {
    decks: DeckModel[];
}

export default class DeckApp extends Component<any, IDeckAppState> {
    constructor(props) {
        super(props);

        this.state = { decks: [] };
    }

    onDecksPopulated(decks: DeckModel[]) {
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