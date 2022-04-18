import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorView } from "./ErrorView";

interface IErrorBoundaryProps {
    children?: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
    currentPage?: string;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error: Error): IErrorBoundaryState {
        const newState: IErrorBoundaryState = {
            hasError: true,
            error: error,
            currentPage: window.location.href
        };

        if (Constants.Debug) {
            console.error(error);
        }

        return newState;
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (Constants.Debug) {
            console.error(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return <ErrorView error={this.state.error} errorInfo={this.state.errorInfo} currentPage={this.state.currentPage} />;
        }

        return this.props.children;
    }
}
