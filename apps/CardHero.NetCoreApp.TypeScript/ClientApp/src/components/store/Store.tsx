import React, { Component, Fragment } from "react";
import { IStoreItemModel } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";
import { AccountService } from "../../services/AccountService";
import { StoreService } from "../../services/StoreService";
import { StoreItemBuyModal } from "./StoreItemBuyModal";
import { StoreItemDetails } from "./StoreItemDetails";

interface IStoreProps {
}

interface IStoreState {
    items: IStoreItemModel[];
    selectedItem?: IStoreItemModel;
    modalShown: boolean;
}

export class Store extends Component<IStoreProps, IStoreState> {
    static contextType = AccountContext;

    constructor(props: IStoreProps) {
        super(props);

        this.state = {
            items: [],
            modalShown: false
        };
    }

    async componentDidMount() {
        const items = await StoreService.getStoreItems();

        this.setState({
            items: items
        });
    }

    onModalHide() {
        this.setState({
            modalShown: false
        });
    }

    onSelectItem(item: IStoreItemModel) {
        if (Constants.Debug) {
            console.log(item);
        }

        this.setState({
            selectedItem: item,
            modalShown: true
        });
    }

    async onPurchase(item: IStoreItemModel) {
        const items = await StoreService.buyCardBundle(item.id);

        if (Constants.Debug) {
            console.log(items);
        }

        this.setState({
            modalShown: false
        });

        const user = await AccountService.getAccount();

        if (user) {
            this.context.setUser(user);
        }

        alert('Purchased bundle ' + item.name);
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    {this.state.items.map(x =>
                        <div key={x.id} className="col-lg-4">
                            <StoreItemDetails storeItem={x} onSelectItem={(item) => this.onSelectItem(item)} />
                        </div>
                    )}
                </div>
                <StoreItemBuyModal
                    show={this.state.modalShown}
                    onHide={() => this.onModalHide()}
                    onPurchase={(item) => this.onPurchase(item)}
                    storeItem={this.state.selectedItem}
                />
            </Fragment>
        );
    }
}