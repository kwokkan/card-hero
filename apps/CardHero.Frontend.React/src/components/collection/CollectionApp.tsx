import { Fragment, useState } from "react";
import { ICardCollectionModel } from "../../clients/clients";
import { CollectionList } from "./CollectionList";
import { CollectionSearch } from "./CollectionSearch";

export function CollectionApp(): JSX.Element {
    const [collection, setCollection] = useState<ICardCollectionModel[]>([]);

    const onCollectionPopulated = (collection: ICardCollectionModel[]) => {
        if (Constants.Debug) {
            if (collection != null) {
                collection.forEach(card => {
                    console.log(card);
                });
            }
        }

        setCollection(collection);
    };

    return (
        <Fragment>
            <div className="col-lg-2">
                <CollectionSearch
                    onCollectionPopulated={(x) => onCollectionPopulated(x)} />
            </div>
            <div className="col-lg-10">
                <CollectionList collection={collection} />
            </div>
        </Fragment>
    );
}
