import { ICardCollectionModel } from "../../clients/clients";
import { CardWidget } from "../shared/CardWidget";

interface ICollectionListProps {
    collection: ICardCollectionModel[];
}

export function CollectionList(props: ICollectionListProps): JSX.Element {
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