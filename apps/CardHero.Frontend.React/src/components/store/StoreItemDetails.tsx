import { Fragment } from "react";
import { IStoreItemModel } from "../../clients/clients";
import { CoinFormat } from "../shared/CoinFormat";
import { DateFormat } from "../shared/DateFormat";

interface IStoreItemDetailsProps {
    storeItem: IStoreItemModel;
    onSelectItem?: (item: IStoreItemModel) => void;
}

export function StoreItemDetails(props: IStoreItemDetailsProps): JSX.Element {
    const si = props.storeItem;

    const onSelectItem = () => {
        if (props.onSelectItem) {
            props.onSelectItem(si);
        }
    };

    return (
        <div className="card">
            <h4 className="card-header">
                <span>{si.name}</span>
                <span className="pull-right badge-pill badge-secondary">{si.itemCount}</span>
            </h4>
            <div className="card-body">
                <p>{si.description}</p>
            </div>
            <div className="card-footer">
                {si.expiry &&
                    (
                        <Fragment>
                            <span>Expires </span>
                            <DateFormat date={si.expiry} />
                        </Fragment>
                    )
                }
                <button type="button" className="btn btn-primary pull-right" onClick={onSelectItem}>
                    Buy for <CoinFormat coins={si.cost} title={si.cost.toString()} stripEmpty={true} />
                </button>
            </div>
        </div>
    );
}