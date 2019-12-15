import React, { ChangeEvent, Component, Fragment } from "react";
import { GameCreateModel, IDeckModel, IGameModel } from "../../clients/clients";
import { GameService } from "../../services/GameService";
import { Icon } from "../../styles/index";
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
    modalShown: boolean;
}

export class GameSearch extends Component<IGameSearchProps, IGameSearchState> {
    constructor(props: IGameSearchProps) {
        super(props);

        this.state = {
            modalShown: false
        };
    }

    async componentDidMount() {
        this.getGames();
    }

    async getGames(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var games = await GameService.getGames(this.state);

        if (this.props.onGamesPopulated) {
            this.props.onGamesPopulated(games);
        }
    }

    onInputChange(prop: KeyOfType<IGameSearchState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState: IGameSearchState = {
            [prop]: e.target.value
        } as any;

        this.setState(newState);
    }

    onCheckboxChange(prop: KeyOfType<IGameSearchState, boolean>, e: ChangeEvent<HTMLInputElement>) {
        const newState: IGameSearchState = {
            [prop]: e.target.checked
        } as any;

        this.setState(newState);
    }

    onSelectChange(prop: KeyOfType<IGameSearchState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: IGameSearchState = {
            [prop]: e.target.value
        } as any;

        this.setState(newState);
    }

    async onGameCreated(game: IGameCreateModalOnCreatedProps) {
        if (Constants.Debug) {
            console.log(game);
        }

        const postGame = new GameCreateModel(game);
        await GameService.createGame(postGame);

        await this.getGames();
    }

    render() {
        return (
            <Fragment>
                <div className="card">
                    <h4 className="card-header">
                        Games
                    </h4>

                    <form method="get" className="search-filter game-filter">
                        <div className="card-body">
                            <div className="form-group">
                                <input type="text" name="name" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.onInputChange('name', e)} />
                            </div>

                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" defaultChecked={this.state.activeOnly} onChange={(e) => this.onCheckboxChange('activeOnly', e)} />
                                    {' '}
                                    Active Only
                            </label>
                            </div>

                            <div className="form-group">
                                <select name="pageSize" className="form-control" value={this.state.pageSize} onChange={(e) => this.onSelectChange('pageSize', e)}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button type="button" className="btn btn-success auto-modal" onClick={() => this.setState({ modalShown: true })}><Icon icon="plus" /></button>
                            <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.getGames(e)}>Filter</button>

                            <div className="clearfix"></div>
                        </div>
                    </form>
                </div>

                <GameCreateModal
                    show={this.state.modalShown}
                    onCreated={(game) => this.onGameCreated(game)}
                    onHide={() => this.setState({ modalShown: false })}
                    decks={this.props.decks}
                />
            </Fragment>
        );
    }
}
