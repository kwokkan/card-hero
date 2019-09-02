import React, { ChangeEvent, Component, Fragment } from "react";
import DeckModel from "../../models/DeckModel";
import DeckService from "../../services/DeckService";
import Icon from "../../styles/index";
import DeckCreateModal, { IDeckCreateModelOnCreatedProps } from "./DeckCreateModal";

interface IDeckSearchProps {
    onDecksPopulated?: ((decks: DeckModel[]) => void);
}

interface IDeckSearchState  {
    name?: string;
    page?: number;
    pageSize?: number;
    modalShown: boolean;
}

export default class DeckSearch extends Component<IDeckSearchProps, IDeckSearchState> {
    constructor(props: IDeckSearchProps) {
        super(props);

        this.state = {
            modalShown: false
        };
    }

    async componentDidMount() {
        await this.getDecks();
    }

    async getDecks(e?) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var decks = await DeckService.getDecks(this.state);

        if (this.props.onDecksPopulated) {
            this.props.onDecksPopulated(decks);
        }
    }

    onInputChange(prop: string, e: ChangeEvent<HTMLInputElement>) {
        const newState = {};
        newState[prop] = e.target.value;

        this.setState(newState);
    }

    onSelectChange(prop: string, e: ChangeEvent<HTMLSelectElement>) {
        const newState = {};
        newState[prop] = e.target.value;

        this.setState(newState);
    }

    async onDeckCreated(deck: IDeckCreateModelOnCreatedProps) {
        await DeckService.createDeck(deck);

        await this.getDecks();
    }

    render() {
        return (
            <Fragment>
                <div className="card">
                    <h4 className="card-header">
                        Decks
                    </h4>

                    <form method="get" className="search-filter deck-filter">
                        <div className="card-body">
                            <div className="form-group">
                                <input type="text" name="name" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.onInputChange('name', e)} />
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
                            <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.getDecks(e)}>Filter</button>

                            <div className="clearfix"></div>
                        </div>
                    </form>
                </div>
                <DeckCreateModal
                    show={this.state.modalShown}
                    onCreated={(deck) => this.onDeckCreated(deck)}
                    onHide={() => this.setState({ modalShown: false })}
                />
            </Fragment>
        );
    }
}