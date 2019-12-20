import React, { Component } from "react";
import { DeckCardModel, ICardCollectionModel, IDeckModel } from "../../clients/clients";
import { CardCollectionService } from "../../services/CardCollectionService";
import { DeckService } from "../../services/DeckService";
import { CardCollectionWidget } from "../shared/CardCollectionWidget";
import { DeckDetailsWidget } from "./DeckDetailsWidget";

interface IDeckProps {
    id: number;
}

interface IDeckState {
    deck?: IDeckModel;
    ownedCards: ICardCollectionModel[];
    usedCards: DeckCardModel[];
}

export class Deck extends Component<IDeckProps, IDeckState> {
    constructor(props: IDeckProps) {
        super(props);

        this.state = {
            ownedCards: [],
            usedCards: []
        };
    }

    private async populateCollection() {
        const collection = await CardCollectionService.getCollection();

        this.setState({
            ownedCards: collection
        });
    }

    private async populateDeck(id: number) {
        const deck = await DeckService.getDeckById(id);

        this.setState({
            deck: deck,
            usedCards: deck.cards
        });
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
        const deck = this.state.deck;

        if (!deck) {
            return null;
        }

        const ownedCards = this.state.ownedCards;
        const usedCards = this.state.usedCards;

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
