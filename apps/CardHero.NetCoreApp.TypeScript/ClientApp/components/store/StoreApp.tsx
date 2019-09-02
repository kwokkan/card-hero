import React, { Component } from "react";
import Layout from "../shared/Layout";
import Store from "./Store";

interface IStoreAppProps {
}

interface IStoreAppState {
}

export default class StoreApp extends Component<IStoreAppProps, IStoreAppState> {
    constructor(props: IStoreAppProps) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Store />
            </Layout>
        );
    }
}