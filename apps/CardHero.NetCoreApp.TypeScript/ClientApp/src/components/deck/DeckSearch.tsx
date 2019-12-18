import React, { ChangeEvent, Component, Fragment } from "react";
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
    modalShown: boolean;
}

export class DeckSearch extends Component<IDeckSearchProps, IDeckSearchState> {
    constructor(props: IDeckSearchProps) {
        super(props);

        this.state = {
            modalShown: false
        };
    }

    async componentDidMount() {
        await this.getDecks();
    }

    async getDecks(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var decks = await DeckService.getDecks(this.state);

        if (this.props.onDecksPopulated) {
            this.props.onDecksPopulated(decks);
        }
    }

    onInputChange(prop: KeyOfType<IDeckSearchState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState: IDeckSearchState = {
            [prop]: e.target.value
        } as any;

        this.setState(newState);
    }

    onSelectChange(prop: KeyOfType<IDeckSearchState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: IDeckSearchState = {
            [prop]: parseInt(e.target.value)
        } as any;

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
                                <NumberDropDown name="pageSize" value={this.state.pageSize} onChange={(e) => this.onSelectChange("pageSize", e)} />
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
