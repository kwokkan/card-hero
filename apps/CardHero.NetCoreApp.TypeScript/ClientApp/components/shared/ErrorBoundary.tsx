import React, { Component, ErrorInfo } from "react";
import { ErrorView } from "./ErrorView";

interface IErrorBoundatyState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<any, IErrorBoundatyState> {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error): IErrorBoundatyState {
        const newState: IErrorBoundatyState = {
            hasError: true,
            error: error
        };

        if (Constants.Debug) {
            console.error(error);
        }

        return newState;
    }

    componentDidCatch(error, errorInfo) {
        if (Constants.Debug) {
            console.error(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return <ErrorView error={this.state.error} errorInfo={this.state.errorInfo} />;
        }

        return this.props.children;
    }
}
