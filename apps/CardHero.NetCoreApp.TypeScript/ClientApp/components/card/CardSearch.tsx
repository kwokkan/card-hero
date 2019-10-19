import React, { ChangeEvent, Component } from "react";
import { ICardModel } from "../../clients/clients";
import { CardService } from "../../services/CardService";

interface ICardSearchProps {
    onCardsPopulated?: ((cards: ICardModel[]) => void);
}

interface ICardSearchState  {
    name?: string;
    page?: number;
    pageSize?: number;
}

export class CardSearch extends Component<ICardSearchProps, ICardSearchState> {
    constructor(props: ICardSearchProps) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        await this.getCards();
    }

    async getCards(e?) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardService.getCards(this.state);

        if (cards && this.props.onCardsPopulated) {
            this.props.onCardsPopulated(cards);
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

    render() {
        return (
            <div className="card">
                <h4 className="card-header">
                    Cards
                </h4>

                <form method="get" className="search-filter card-filter">
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
                        <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.getCards(e)}>Filter</button>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
        );
    }
}