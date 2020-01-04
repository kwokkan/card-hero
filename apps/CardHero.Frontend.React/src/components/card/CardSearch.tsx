import React, { ChangeEvent, Component } from "react";
import { ICardModel, ICardPackModel } from "../../clients/clients";
import { CardPackService } from "../../services/CardPackService";
import { CardService } from "../../services/CardService";
import { NumberDropDown } from "../shared/NumberDropDown";

interface ICardSearchProps {
    onCardsPopulated?: ((cards: ICardModel[]) => void);
}

interface ICardSearchState {
    name?: string;
    cardPacks?: ICardPackModel[];
    selectedCardPackId?: number;
    page?: number;
    pageSize?: number;
}

export class CardSearch extends Component<ICardSearchProps, ICardSearchState> {
    constructor(props: ICardSearchProps) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        await Promise.all([
            this.getCards(),
            this.getCardPacks()
        ]);
    }

    async getCardPacks() {
        var cardPacks = await CardPackService.getCardPacks();

        this.setState({
            cardPacks: cardPacks
        });
    }

    async getCards(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardService.getCards(this.state);

        if (cards && this.props.onCardsPopulated) {
            this.props.onCardsPopulated(cards);
        }
    }

    onInputChange(prop: KeyOfType<ICardSearchState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState: ICardSearchState = {
            [prop]: e.target.value
        };

        this.setState(newState);
    }

    onSelectChange(prop: KeyOfType<ICardSearchState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: ICardSearchState = {
            [prop]: parseInt(e.target.value)
        };

        this.setState(newState);
    }

    render() {
        const cardPacks = this.state.cardPacks;

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
                            <select name="selectedCardPackId" className="form-control" value={this.state.selectedCardPackId} onChange={(e) => this.onSelectChange("selectedCardPackId", e)} >
                                <option>All</option>
                                {cardPacks && cardPacks.map(x =>
                                    <option value={x.id}>{x.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <NumberDropDown name="pageSize" value={this.state.pageSize} onChange={(e) => this.onSelectChange("pageSize", e)} />
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
