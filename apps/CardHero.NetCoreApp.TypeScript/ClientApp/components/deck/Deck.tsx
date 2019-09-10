import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import DeckEditModel from "../../models/DeckEditModel";
import { DeckId } from "../../models/DeckModel";
import CardCollectionService from "../../services/CardCollectionService";
import DeckService from "../../services/DeckService";
import Icon from "../../styles/index";
import Layout from "../shared/Layout";

interface IDeckProps {
    match?: any;
}

interface IDeckState {
    edit?: DeckEditModel;
}

export default class Deck extends PureComponent<IDeckProps, IDeckState> {
    constructor(props) {
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

    private async populateDeck(id: DeckId) {
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
        const deckId: DeckId = this.props.match.params.id;

        await Promise.all([
            this.populateDeck(deckId),
            this.populateCollection()
        ]);
    }

    async componentWillReceiveProps(nextProps: IDeckProps) {
        const deckId: DeckId = this.props.match.params.id;

        if (nextProps.match.params.id !== deckId) {
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
            <Layout>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    <Link to={'/' + deck.id}>{deck.name}</Link>
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
                                            <li key={cc.id as any} className="ch-card draggable" data-card-collection-id={cc.id}>{cc.card.name}</li>
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
                                            <li key={cc.id as any} className="ch-card draggable" data-card-collection-id={cc.cardCollectionId}>{cc.name}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}