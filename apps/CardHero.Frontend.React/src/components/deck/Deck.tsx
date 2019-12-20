import React, { PureComponent } from "react";
import { ICardCollectionModel } from "../../clients/clients";
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
        const deck = await DeckService.getDeckById(id);

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

    onOwnedCardsCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }
    };

    onCurrentDeckCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }
    };

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
                        <CardCollectionWidget
                            title="Owned Cards"
                            cardCollection={ownedCards}
                            cardActionName="Add"
                            onCardClicked={this.onOwnedCardsCardClicked}
                            cardActionDisabled={usedCards.length >= deck.maxCards}
                            cardActionClassName="btn-primary"
                        />
                    </div>

                    <div className="col-lg-4">
                        <CardCollectionWidget
                            title="Current Deck"
                            cardCollection={usedCards}
                            cardActionName="Remove"
                            onCardClicked={this.onCurrentDeckCardClicked}
                            cardActionClassName="btn-danger"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
