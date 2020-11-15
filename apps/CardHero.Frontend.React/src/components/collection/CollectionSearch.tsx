import React, { ChangeEvent, useEffect, useState } from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { CardCollectionService } from "../../services/CardCollectionService";
import { NumberDropDown } from "../shared/NumberDropDown";

interface ICollectionSearchProps {
    onCollectionPopulated?: ((cards: ICardCollectionModel[]) => void);
}

interface ICollectionSearchState {
    name?: string;
    page?: number;
    pageSize?: number;
}

export function CollectionSearch(props: ICollectionSearchProps): JSX.Element {
    const [search, setSearch] = useState<ICollectionSearchState>({});

    const getCollection = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardCollectionService.getCollection(search);

        if (cards && props.onCollectionPopulated) {
            props.onCollectionPopulated(cards);
        }
    };

    useEffect(() => {
        async function load() {
            await getCollection();
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInputChange = (prop: KeyOfType<ICollectionSearchState, string>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: ICollectionSearchState = {
            [prop]: e.target.value
        };

        setSearch(newState);
    };

    const onSelectChange = (prop: KeyOfType<ICollectionSearchState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: ICollectionSearchState = {
            [prop]: parseInt(e.target.value)
        };

        setSearch(newState);
    };

    return (
        <div className="card">
            <h4 className="card-header">
                Collection
            </h4>

            <form method="get" className="search-filter collection-filter">
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" name="name" className="form-control" placeholder="Name" value={search.name} onChange={(e) => onInputChange('name', e)} />
                    </div>

                    <div className="form-group">
                        <NumberDropDown name="pageSize" value={search.pageSize} onChange={(e) => onSelectChange("pageSize", e)} />
                    </div>
                </div>

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary pull-right" onClick={(e) => getCollection(e)}>Filter</button>

                    <div className="clearfix"></div>
                </div>
            </form>
        </div>
    );
}
