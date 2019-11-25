import React, { Component } from "react";
import { Store } from "./Store";

interface IStoreAppProps {
}

interface IStoreAppState {
}

export class StoreApp extends Component<IStoreAppProps, IStoreAppState> {
    constructor(props: IStoreAppProps) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-12">
                <Store />
            </div>
        );
    }
}
