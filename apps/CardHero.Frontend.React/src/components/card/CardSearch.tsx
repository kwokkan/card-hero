import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ICardModel, ICardPackModel } from "../../clients/clients";
import { CardPackService } from "../../services/CardPackService";
import { CardService } from "../../services/CardService";
import { NumberDropDown } from "../shared/NumberDropDown";

interface ICardSearchProps {
    onCardsPopulated?: ((cards: ICardModel[]) => void);
}

interface ICardSearchState {
    name?: string;
    cardPackId?: number;
    page?: number;
    pageSize?: number;
}

export function CardSearch({ onCardsPopulated }: ICardSearchProps): JSX.Element {
    const [search, setSearch] = useState<ICardSearchState>({});
    const [cardPacks, setCardPacks] = useState<Nullable<ICardPackModel[]>>();

    const getCardPacks = async () => {
        var cardPacks = await CardPackService.getCardPacks();

        setCardPacks(cardPacks);
    };

    const getCards = useCallback(async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardService.getCards(search);

        if (cards && onCardsPopulated) {
            onCardsPopulated(cards);
        }
    }, [onCardsPopulated, search]);

    useEffect(() => {
        async function load() {
            await Promise.all([
                getCards(),
                getCardPacks()
            ]);
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInputChange = (prop: KeyOfType<ICardSearchState, string>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: ICardSearchState = {
            [prop]: e.target.value
        };

        setSearch(prev => ({ ...prev, ...newState }));
    };

    const onSelectChange = (prop: KeyOfType<ICardSearchState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: ICardSearchState = {
            [prop]: parseInt(e.target.value)
        };

        setSearch(prev => ({ ...prev, ...newState }));
    };

    return (
        <div className="card">
            <h4 className="card-header">
                Cards
                </h4>

            <form method="get" className="search-filter card-filter">
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Name" value={search.name} onChange={(e) => onInputChange('name', e)} />
                    </div>

                    <div className="form-group">
                        <select name="cardPackId" className="form-control" value={search.cardPackId} onChange={(e) => onSelectChange("cardPackId", e)} >
                            <option>All</option>
                            {cardPacks && cardPacks.map(x =>
                                <option key={x.id} value={x.id}>{x.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <NumberDropDown name="pageSize" value={search.pageSize} onChange={(e) => onSelectChange("pageSize", e)} />
                    </div>
                </div>

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary pull-right" onClick={(e) => getCards(e)}>Filter</button>

                    <div className="clearfix"></div>
                </div>
            </form>
        </div>
    );
}
