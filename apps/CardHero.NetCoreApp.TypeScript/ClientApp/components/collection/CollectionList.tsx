import React from "react";
import AccountModel from "../../models/AccountModel";
import CardCollectionModel from "../../models/CardCollectionModel";
import CardWidget from "../shared/CardWidget";

interface ICollectionListProps {
    collection: CardCollectionModel[];
    user?: AccountModel;
}

export default function CollectionList(props: ICollectionListProps) {
    return (
        <div className="row">
            {props.collection.map(x =>
                <div key={x.id} className="col-lg-3">
                    <CardWidget card={x.card} />
                </div>
            )}
        </div>
    );
}