import { Modal } from "react-bootstrap";
import { IStoreItemModel } from "../../clients/clients";

interface IStoreItemBuyModelProps {
    show: boolean;
    onHide?: () => void;
    storeItem?: IStoreItemModel;
    onPurchase?: (item: IStoreItemModel) => void;
}

export function StoreItemBuyModal(props: IStoreItemBuyModelProps): JSX.Element | null {
    const onHide = () => {
        if (props.onHide) {
            props.onHide();
        }
    };

    const onPurchase = () => {
        if (props.onPurchase) {
            props.onPurchase(props.storeItem);
        }
    };

    if (!props.storeItem) return null;

    return (
        <Modal
            {...props}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Purchase item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="container">
                        Buy <strong>{props.storeItem.name}</strong>?
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={() => onHide()}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={() => onPurchase()}>Purchase</button>
            </Modal.Footer>
        </Modal>
    );
}
