import React, { PureComponent } from "react";
import { DeckEditModel } from "../../models/DeckEditModel";
import { CardCollectionService } from "../../services/CardCollectionService";
import { DeckService } from "../../services/DeckService";
import { CardCollectionWidget } from "../shared/CardCollectionWidget";
import { DeckDetailsWidget } from "./DeckDetailsWidget";

interface IDeckProps {
    id: number;
}

interface IDeckState {
    edit?: DeckEditModel;
}

export class Deck extends PureComponent<IDeckProps, IDeckState> {
    constructor(props: IDeckProps) {
        super(props);

        this.state = {};
    }

    private async populateCollection() {
        const collection = await CardCollectionService.getCollection();

        this.setState((prevState) => ({
            edit: {
                ...prevState.edit,
                ownedCards: collection
            }
        }));
    }

    private async populateDeck(id: number) {
        const decks = await DeckService.getDecks({
            ids: [
                id
            ]
        });

        const deck = decks[0];

        this.setState((prevState) => ({
            edit: {
                ...prevState.edit,
                deck: deck
            }
        }));
    }

    async componentDidMount() {
        const deckId: number = this.props.id;

        await Promise.all([
            this.populateDeck(deckId),
            this.populateCollection()
        ]);
    }

    async componentWillReceiveProps(nextProps: IDeckProps) {
        const deckId: number = this.props.id;

        if (nextProps.id !== deckId) {
            await this.populateDeck(deckId);
        }
    }

    render() {
        const edit = this.state.edit;

        if (!edit) {
            return null;
        }

        const deck = edit.deck;

        if (!deck) {
            return null;
        }

        const ownedCards = edit.ownedCards;
        const usedCards = deck.cards;

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4">
                        <DeckDetailsWidget deck={deck} />
                    </div>

                    <div className="col-lg-4">
                        <CardCollectionWidget title="Owned Cards" cardCollection={ownedCards} />
                    </div>

                    <div className="col-lg-4">
                        <CardCollectionWidget title="Current Deck" cardCollection={usedCards} />
                    </div>
                </div>
            </div>
        );
    }
}
