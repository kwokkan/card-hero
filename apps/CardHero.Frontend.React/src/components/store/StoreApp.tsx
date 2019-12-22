import React, { Component } from "react";
import { Store } from "./Store";

export class StoreApp extends Component<{}, {}> {
    render() {
        return (
            <div className="col-lg-12">
                <Store />
            </div>
        );
    }
}
