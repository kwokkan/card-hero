import React, { PureComponent, ReactNode } from 'react';
import { IUserModel } from '../../clients/clients';
import { AccountContext } from '../../contexts/AccountContext';
import { ErrorBoundary } from './ErrorBoundary';
import { NavMenu } from './NavMenu';

interface ILayoutProps {
    sideContent?: ReactNode;
}

interface ILayoutState {
    user?: IUserModel;
    setUser: (user: IUserModel) => void;
}

export class Layout extends PureComponent<ILayoutProps, ILayoutState> {
    constructor(props) {
        super(props);

        this.state = {
            setUser: (user) => {
                this.setState({
                    user: user
                })
            }
        };
    }

    render() {
        var hasSideContent = this.props.sideContent != null;
        var mainCol = hasSideContent ? 10 : 12;

        return (
            <ErrorBoundary>
                <AccountContext.Provider value={this.state}>
                    <NavMenu />

                    <div className="container-fluid body-content">
                        <div className="row">
                            {hasSideContent &&
                                <div className="col-lg-2">
                                    {this.props.sideContent}
                                </div>
                            }

                            <div className={'col-lg-' + mainCol}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </AccountContext.Provider>
            </ErrorBoundary>
        );
    }
}
