import React, { Component, Fragment } from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { CollectionList } from "./CollectionList";
import { CollectionSearch } from "./CollectionSearch";

interface ICollectionAppState {
    collection: ICardCollectionModel[];
}

export class CollectionApp extends Component<any, ICollectionAppState> {
    constructor(props: any) {
        super(props);

        this.state = { collection: [] };
    }

    onCollectionPopulated(collection: ICardCollectionModel[]) {
        if (Constants.Debug) {
            if (collection != null) {
                collection.forEach(card => {
                    console.log(card);
                });
            }
        }

        this.setState({
            collection: collection
        })
    }

    render() {
        return (
            <Fragment>
                <div className="col-lg-2">
                    <CollectionSearch
                        onCollectionPopulated={(x) => this.onCollectionPopulated(x)} />
                </div>
                <div className="col-lg-10">
                    <CollectionList collection={this.state.collection} />
                </div>
            </Fragment>
        );
    }
}
