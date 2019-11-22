import React, { Component, Fragment } from "react";
import { IDeckModel } from "../../clients/clients";
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
            <Fragment>
                <div className="col-lg-2">
                    <DeckSearch
                        onDecksPopulated={(x) => this.onDecksPopulated(x)} />
                </div>
                <div className="col-lg-10">
                    <DeckList decks={this.state.decks} />
                </div>
            </Fragment>
        );
    }
}
