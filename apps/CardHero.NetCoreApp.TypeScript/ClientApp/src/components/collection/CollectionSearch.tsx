import React, { ChangeEvent, Component } from "react";
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

export class CollectionSearch extends Component<ICollectionSearchProps, ICollectionSearchState> {
    constructor(props: ICollectionSearchProps) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        await this.getCollection();
    }

    async getCollection(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardCollectionService.getCollection(this.state);

        if (cards && this.props.onCollectionPopulated) {
            this.props.onCollectionPopulated(cards);
        }
    }

    onInputChange(prop: KeyOfType<ICollectionSearchState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState: ICollectionSearchState = {
            [prop]: e.target.value
        };

        this.setState(newState);
    }

    onSelectChange(prop: KeyOfType<ICollectionSearchState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: ICollectionSearchState = {
            [prop]: parseInt(e.target.value)
        };

        this.setState(newState);
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-header">
                    Collection
                </h4>

                <form method="get" className="search-filter collection-filter">
                    <div className="card-body">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.onInputChange('name', e)} />
                        </div>

                        <div className="form-group">
                            <NumberDropDown name="pageSize" value={this.state.pageSize} onChange={(e) => this.onSelectChange("pageSize", e)} />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.getCollection(e)}>Filter</button>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
        );
    }
}
