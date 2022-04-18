import { Fragment, useEffect, useState } from "react";
import { IStoreItemModel } from "../../clients/clients";
import { useAccountContext } from "../../contexts/AccountContextProvider";
import { useNotificationContext } from "../../contexts/NotificationContextProvider";
import { AccountService } from "../../services/AccountService";
import { StoreService } from "../../services/StoreService";
import { NotificationType } from "../../types/NotificationType";
import { StoreItemBuyModal } from "./StoreItemBuyModal";
import { StoreItemDetails } from "./StoreItemDetails";

export function Store(): JSX.Element {
    const [itemsState, setItemsState] = useState<IStoreItemModel[]>([]);
    const [selectedItemState, setSelectedItemState] = useState<IStoreItemModel>();
    const [modelShownState, setModelShownState] = useState<boolean>(false);

    const { setUser } = useAccountContext();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        async function loadData() {
            const items = await StoreService.getStoreItems();

            setItemsState(items);
        }

        loadData();
    }, []);

    const onModalHide = () => {
        setModelShownState(false);
    }

    const onSelectItem = (item: IStoreItemModel) => {
        if (Constants.Debug) {
            console.log(item);
        }

        setSelectedItemState(item);
        setModelShownState(true);
    }

    const onPurchase = async (item: IStoreItemModel) => {
        const items = await StoreService.buyCardBundle(item.id);

        if (Constants.Debug) {
            console.log(items);
        }

        setModelShownState(false);

        const user = await AccountService.getAccount();

        if (user) {
            setUser(user);
        }

        addNotification({
            title: "Purchased",
            message: <Fragment>Purchased bundle <strong>{item.name}</strong></Fragment>,
            type: NotificationType.Success
        });
    }

    return (
        <Fragment>
            <div className="row">
                {itemsState.map(x =>
                    <div key={x.id} className="col-lg-4">
                        <StoreItemDetails storeItem={x} onSelectItem={(item) => onSelectItem(item)} />
                    </div>
                )}
            </div>
            <StoreItemBuyModal
                show={modelShownState}
                onHide={() => onModalHide()}
                onPurchase={(item) => onPurchase(item)}
                storeItem={selectedItemState}
            />
        </Fragment>
    );
}
