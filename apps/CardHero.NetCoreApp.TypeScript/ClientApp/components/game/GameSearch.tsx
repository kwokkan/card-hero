import React, { ChangeEvent, Component, Fragment } from "react";
import Constants from "../../constants/constants";
import DeckModel from "../../models/DeckModel";
import GameModel from "../../models/GameModel";
import DeckService from "../../services/DeckService";
import GameService from "../../services/GameService";
import Icon from "../../styles/index";
import GameCreateModal, { IGameCreateModalOnCreatedProps } from "./GameCreateModal";

interface IGameSearchProps {
    onGamesPopulated?: ((games: GameModel[]) => void);
}

interface IGameSearchState {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
    modalShown: boolean;
    decks: DeckModel[];
}

export default class GameSearch extends Component<IGameSearchProps, IGameSearchState> {
    constructor(props) {
        super(props);

        this.state = {
            modalShown: false,
            decks: []
        };
    }

    async componentDidMount() {
        Promise.all([
            this.getDecks(),
            this.getGames()
        ]);
    }

    async getDecks() {
        const decks = await DeckService.getDecks();

        this.setState({
            decks: decks
        });
    }

    async getGames(e?) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var games = await GameService.getGames(this.state);

        if (this.props.onGamesPopulated) {
            this.props.onGamesPopulated(games);
        }
    }

    onInputChange(prop: string, e: ChangeEvent<HTMLInputElement>) {
        const newState = {};
        newState[prop] = e.target.value;

        this.setState(newState);
    }

    onCheckboxChange(prop: string, e: ChangeEvent<HTMLInputElement>) {
        const newState = {};
        newState[prop] = e.target.checked;

        this.setState(newState)
    }

    onSelectChange(prop: string, e: ChangeEvent<HTMLSelectElement>) {
        const newState = {};
        newState[prop] = e.target.value;

        this.setState(newState);
    }

    async onGameCreated(game: IGameCreateModalOnCreatedProps) {
        if (Constants.Debug) {
            console.log(game);
        }

        await GameService.createGame(game);

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
                    decks={this.state.decks}
                />
            </Fragment>
        );
    }
}