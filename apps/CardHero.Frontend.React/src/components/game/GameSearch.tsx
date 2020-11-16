import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { GameCreateModel, IDeckModel, IGameModel } from "../../clients/clients";
import { GameService } from "../../services/GameService";
import { Icon } from "../../styles/index";
import { NumberDropDown } from "../shared/NumberDropDown";
import { GameCreateModal, IGameCreateModalOnCreatedProps } from "./GameCreateModal";

interface IGameSearchProps {
    decks: IDeckModel[];
    onGamesPopulated?: ((games: IGameModel[]) => void);
}

interface IGameSearchState {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
}

export function GameSearch(props: IGameSearchProps): JSX.Element {
    const [search, setSearch] = useState<IGameSearchState>({});
    const [modalShown, setModalShown] = useState<boolean>(false);

    useEffect(() => {
        async function load() {
            await getGames();
        }

        load();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGames = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var games = await GameService.getGames(search);

        if (props.onGamesPopulated) {
            props.onGamesPopulated(games);
        }
    };

    const onInputChange = (prop: KeyOfType<IGameSearchState, string>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: IGameSearchState = {
            [prop]: e.target.value
        } as any;

        setSearch(prev => ({ ...prev, ...newState }));
    };

    const onCheckboxChange = (prop: KeyOfType<IGameSearchState, boolean>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: IGameSearchState = {
            [prop]: e.target.checked
        } as any;

        setSearch(prev => ({ ...prev, ...newState }));
    };

    const onSelectChange = (prop: KeyOfType<IGameSearchState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: IGameSearchState = {
            [prop]: e.target.value
        } as any;

        setSearch(prev => ({ ...prev, ...newState }));
    };

    const onGameCreated = async (game: IGameCreateModalOnCreatedProps) => {
        if (Constants.Debug) {
            console.log(game);
        }

        const postGame = new GameCreateModel(game);
        await GameService.createGame(postGame);

        await getGames();
    };

    return (
        <Fragment>
            <div className="card">
                <h4 className="card-header">
                    Games
                </h4>

                <form method="get" className="search-filter game-filter">
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={search.name} onChange={(e) => onInputChange('name', e)} />
                        </div>

                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" defaultChecked={search.activeOnly} onChange={(e) => onCheckboxChange('activeOnly', e)} />
                                {' '}
                                Active Only
                            </label>
                        </div>

                        <div className="form-group">
                            <NumberDropDown name="pageSize" value={search.pageSize} onChange={(e) => onSelectChange("pageSize", e)} />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="button" className="btn btn-success auto-modal" onClick={() => setModalShown(true)}><Icon icon="plus" /></button>
                        <button type="submit" className="btn btn-primary pull-right" onClick={(e) => getGames(e)}>Filter</button>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>

            <GameCreateModal
                show={modalShown}
                onCreated={(game) => onGameCreated(game)}
                onHide={() => setModalShown(false)}
                decks={props.decks}
            />
        </Fragment>
    );
}
