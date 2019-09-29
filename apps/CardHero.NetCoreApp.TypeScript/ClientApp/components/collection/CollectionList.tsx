import React from "react";
import { CardCollectionModel } from "../../clients/clients";
import CardWidget from "../shared/CardWidget";

interface ICollectionListProps {
    collection: CardCollectionModel[];
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