import React, { Component } from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { Layout } from "../shared/Layout";
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
            <Layout
                sideContent={<CollectionSearch
                    onCollectionPopulated={(x) => this.onCollectionPopulated(x)} />
                }
            >
                <CollectionList collection={this.state.collection} />
            </Layout>
        );
    }
}