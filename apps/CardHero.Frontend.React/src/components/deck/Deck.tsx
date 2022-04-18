import { useCallback, useEffect, useState } from "react";
import { debounce } from "throttle-debounce";
import { DeckCardModel, ICardCollectionModel, IDeckCardModel, IDeckModel } from "../../clients/clients";
import { CardCollectionService } from "../../services/CardCollectionService";
import { DeckService } from "../../services/DeckService";
import { CardCollectionWidget } from "../shared/CardCollectionWidget";
import { InlineSearchBar } from "../shared/InlineSearchBar";
import { DeckDetailsWidget } from "./DeckDetailsWidget";

interface IDeckProps {
    id: number;
}

export function Deck(props: IDeckProps): JSX.Element {
    const [searchValue, setSearchValue] = useState<Nullable<string>>("");
    const [deck, setDeck] = useState<Nullable<IDeckModel>>();
    const [ownedCards, setOWnedCards] = useState<ICardCollectionModel[]>([]);
    const [usedCards, setUsedCards] = useState<IDeckCardModel[]>([]);

    const populateCollection = async () => {
        const collection = await CardCollectionService.getCollection({
            name: searchValue
        });

        setOWnedCards(collection);
    };

    const populateDeck = async (id: number) => {
        const deck = await DeckService.getDeckById(id);

        setDeck(deck);
        setUsedCards(deck.cards);
    };

    //TODO: Fix debounce properly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchValueDebounced = useCallback(debounce(500, populateCollection), [searchValue]);

    useEffect(() => {
        async function load() {
            const deckId: number = props.id;

            await Promise.all([
                populateDeck(deckId),
                populateCollection()
            ]);
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const onDeckDetailsFavourite = async (deck: IDeckModel) => {
        if (Constants.Debug) {
            console.log(deck);
        }

        await DeckService.favouriteCard(deck.id, !deck.isFavourited);

        await populateDeck(deck.id);
    };

    const onDeckDetailsSaveClicked = async (deck: IDeckModel) => {
        if (Constants.Debug) {
            console.log(deck);
        }

        const usedDeckCards = usedCards.map(DeckCardModel.fromJS);
        var updateDeck: IDeckModel = {
            cards: usedDeckCards
        };
        await DeckService.patchDeck(deck.id, updateDeck);
    };

    const onOwnedCardsCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        if (usedCards.length < deck.maxCards) {
            if (usedCards.findIndex(x => x.cardCollectionId === card.id) === -1) {
                const newState = usedCards
                    .slice()
                    .concat({
                        card: card.card,
                        cardCollectionId: card.id
                    });

                setUsedCards(newState);
            }
        }
    };

    const onCurrentDeckCardClicked = (card: ICardCollectionModel) => {
        if (Constants.Debug) {
            console.log(card);
        }

        const usedIdx = usedCards.findIndex(x => x.cardCollectionId === card.id);
        if (usedIdx > -1) {
            const newState = usedCards.slice();
            newState.splice(usedIdx, 1);

            setUsedCards(newState);
        }
    };

    const onSearchValueUpdated = (value: string) => {
        if (Constants.Debug) {
            console.log(value);
        }

        setSearchValue(value);
    };

    useEffect(() => {
        searchValueDebounced();
    }, [searchValueDebounced]);

    const deckCardToCardCollection = (deckCard: IDeckCardModel): ICardCollectionModel => {
        if (!deckCard) {
            return null;
        }

        return {
            card: deckCard.card,
            cardId: deckCard.card.id,
            id: deckCard.cardCollectionId
        };
    };

    if (!deck) {
        return null;
    }

    const usedDeckCards = usedCards.map(deckCardToCardCollection);

    return (
        <div className="col-lg-12">
            <div className="row">
                <div className="col-lg-4">
                    <DeckDetailsWidget deck={deck} onFavourite={onDeckDetailsFavourite} onSaveClicked={onDeckDetailsSaveClicked} />
                </div>

                <div className="col-lg-4">
                    <CardCollectionWidget
                        title="Owned Cards"
                        cardCollection={ownedCards}
                        cardActionName="Add"
                        onCardClicked={onOwnedCardsCardClicked}
                        cardActionDisabled={usedDeckCards.length >= deck.maxCards}
                        cardActionClassName="btn-primary"
                        subSection={<InlineSearchBar onValueUpdated={onSearchValueUpdated} />}
                    />
                </div>

                <div className="col-lg-4">
                    <CardCollectionWidget
                        title="Current Deck"
                        cardCollection={usedDeckCards}
                        cardActionName="Remove"
                        onCardClicked={onCurrentDeckCardClicked}
                        cardActionClassName="btn-danger"
                    />
                </div>
            </div>
        </div>
    );
}
