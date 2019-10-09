import React, { ChangeEvent, Component } from "react";
import { CardCollectionModel } from "../../clients/clients";
import { CardCollectionService } from "../../services/CardCollectionService";

interface ICollectionSearchProps {
    onCollectionPopulated?: ((cards: CardCollectionModel[]) => void);
}

interface ICollectionSearchState  {
    name?: string;
    page?: number;
    pageSize?: number;
}

export default class CollectionSearch extends Component<ICollectionSearchProps, ICollectionSearchState> {
    constructor(props: ICollectionSearchProps) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        await this.getCollection();
    }

    async getCollection(e?) {
        if (e != null) {
            e.preventDefault();
            e.stopPropagation();
        }

        var cards = await CardCollectionService.getCollection(this.state);

        if (cards && this.props.onCollectionPopulated) {
            this.props.onCollectionPopulated(cards);
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
                    Collection
                </h4>

                <form method="get" className="search-filter collection-filter">
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
                        <button type="submit" className="btn btn-primary pull-right" onClick={(e) => this.getCollection(e)}>Filter</button>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
        );
    }
}