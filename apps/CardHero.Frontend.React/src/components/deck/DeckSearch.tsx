import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { IDeckModel } from "../../clients/clients";
import { DeckService } from "../../services/DeckService";
import { Icon } from "../../styles/index";
import { NumberDropDown } from "../shared/NumberDropDown";
import { DeckCreateModal, IDeckCreateModelOnCreatedProps } from "./DeckCreateModal";

interface IDeckSearchProps {
    onDecksPopulated?: ((decks: IDeckModel[]) => void);
}

interface IDeckSearchState {
    name?: string;
    page?: number;
    pageSize?: number;
}

export function DeckSearch(props: IDeckSearchProps): JSX.Element {
    const [search, setSearch] = useState<IDeckSearchState>({});
    const [modalShown, setModalShown] = useState<boolean>(false);

    const getDecks = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var decks = await DeckService.getDecks(search);

        if (props.onDecksPopulated) {
            props.onDecksPopulated(decks);
        }
    };

    useEffect(() => {
        async function load() {
            await getDecks();
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInputChange = (prop: KeyOfType<IDeckSearchState, string>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: IDeckSearchState = {
            [prop]: e.target.value
        } as any;

        setSearch(newState);
    };

    const onSelectChange = (prop: KeyOfType<IDeckSearchState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: IDeckSearchState = {
            [prop]: parseInt(e.target.value)
        } as any;

        setSearch(newState);
    };

    const onDeckCreated = async (deck: IDeckCreateModelOnCreatedProps) => {
        await DeckService.createDeck(deck);

        await getDecks();
    };

    return (
        <Fragment>
            <div className="card">
                <h4 className="card-header">
                    Decks
                </h4>

                <form method="get" className="search-filter deck-filter">
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={search.name} onChange={(e) => onInputChange('name', e)} />
                        </div>

                        <div className="form-group">
                            <NumberDropDown name="pageSize" value={search.pageSize} onChange={(e) => onSelectChange("pageSize", e)} />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="button" className="btn btn-success auto-modal" onClick={() => setModalShown(true)}><Icon icon="plus" /></button>
                        <button type="submit" className="btn btn-primary pull-right" onClick={(e) => getDecks(e)}>Filter</button>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
            <DeckCreateModal
                show={modalShown}
                onCreated={(deck) => onDeckCreated(deck)}
                onHide={() => setModalShown(false)}
            />
        </Fragment>
    );
}
