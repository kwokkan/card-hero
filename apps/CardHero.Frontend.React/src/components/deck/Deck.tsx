import React, { Component } from "react";
import { DeckCardModel, ICardCollectionModel, IDeckCardModel, IDeckModel } from "../../clients/clients";
import { CardCollectionService } from "../../services/CardCollectionService";
import { DeckService } from "../../services/DeckService";
import { CardCollectionWidget } from "../shared/CardCollectionWidget";
import { InlineSearchBar } from "../shared/InlineSearchBar";
import { DeckDetailsWidget } from "./DeckDetailsWidget";

interface IDeckProps {
    id: number;
}

interface IDeckState {
    searchValue?: string;
    deck?: IDeckModel;
    ownedCards: ICardCollectionModel[];
    usedCards: IDeckCardModel[];
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
        const collection = await CardCollectionService.getCollection({
            name: this.state.searchValue
        });

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

    private onDeckDetailsSaveClicked = async (deck: IDeckModel) => {
        if (Constants.Debug) {
            console.log(deck);
        }

        const usedCards = this.state.usedCards.map(DeckCardModel.fromJS);
        var updateDeck: IDeckModel = {
            cards: usedCards
        };
        await DeckService.patchDeck(deck.id, updateDeck);
    };

    private onOwnedCardsCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        const usedCards = this.state.usedCards;

        if (usedCards.length < this.state.deck.maxCards) {
            if (usedCards.findIndex(x => x.cardCollectionId === card.id) === -1) {
                const newState = usedCards
                    .slice()
                    .concat({
                        card: card.card,
                        cardCollectionId: card.id
                    });

                this.setState({
                    usedCards: newState
                });
            }
        }
    };

    private onCurrentDeckCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        const usedCards = this.state.usedCards;
        const usedIdx = usedCards.findIndex(x => x.cardCollectionId === card.id);
        if (usedIdx > -1) {
            const newState = usedCards.slice();
            newState.splice(usedIdx, 1);

            this.setState({
                usedCards: newState
            });
        }
    };

    private onSearchValueUpdated = (value: string) => {
        if (Constants.Debug) {
            console.log(value);
        }

        this.setState({
            searchValue: value
        }, async () => {
            await this.populateCollection();
        });
    }

    private deckCardToCardCollection(deckCard: IDeckCardModel): ICardCollectionModel {
        if (!deckCard) {
            return null;
        }

        return {
            card: deckCard.card,
            cardId: deckCard.card.id,
            id: deckCard.cardCollectionId
        };
    }

    render() {
        const deck = this.state.deck;

        if (!deck) {
            return null;
        }

        const ownedCards = this.state.ownedCards;
        const usedCards = this.state.usedCards.map(this.deckCardToCardCollection);

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4">
                        <DeckDetailsWidget deck={deck} onSaveClicked={this.onDeckDetailsSaveClicked} />
                    </div>

                    <div className="col-lg-4">
                        <CardCollectionWidget
                            title="Owned Cards"
                            cardCollection={ownedCards}
                            cardActionName="Add"
                            onCardClicked={this.onOwnedCardsCardClicked}
                            cardActionDisabled={usedCards.length >= deck.maxCards}
                            cardActionClassName="btn-primary"
                            subSection={<InlineSearchBar onValueUpdated={this.onSearchValueUpdated} />}
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
