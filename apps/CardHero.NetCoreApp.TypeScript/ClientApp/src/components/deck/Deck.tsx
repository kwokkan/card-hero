import React, { PureComponent } from "react";
import { DeckEditModel } from "../../models/DeckEditModel";
import { CardCollectionService } from "../../services/CardCollectionService";
import { DeckService } from "../../services/DeckService";
import { Icon } from "../../styles/index";

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
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    {deck.name}
                                    <Icon icon="star" className={'deck-favourite float-right' + (deck.isFavourited ? ' enabled' : '')} data-deck-id={deck.id} />
                                </h4>
                                <p className="card-text">{deck.description}</p>
                            </div>
                            <div className="card-footer">
                                <button type="button" id="save-deck" className="btn btn-success pull-right" data-deck-id={deck.id}>Save</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    Owned Cards
                                </h4>
                                <div className="card-text">
                                    <ul id="owned-cards" className="ch-cards droppable">
                                        {ownedCards && ownedCards.map(cc =>
                                            <li key={cc.id} className="ch-card draggable" data-card-collection-id={cc.id}>{cc.card.name}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    Current Deck
                                </h4>
                                <div className="card-text">
                                    <ul id="used-cards" className="ch-cards droppable" data-max-cards={deck.maxCards}>
                                        {usedCards && usedCards.map(cc =>
                                            <li key={cc.id} className="ch-card draggable" data-card-collection-id={cc.cardCollectionId}>{cc.name}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
