import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IUserModel } from "../clients/clients";
import { Card } from "../components/card/Card";
import { CardApp } from "../components/card/CardApp";
import { CollectionApp } from "../components/collection/CollectionApp";
import { DeckApp } from "../components/deck/DeckApp";
import { GameApp } from "../components/game/GameApp";
import { HomeApp } from "../components/home/HomeApp";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";
import { NavMenu } from "../components/shared/NavMenu";
import { StoreApp } from "../components/store/StoreApp";
import { AccountContext } from "../contexts/AccountContext";
import { AccountService } from "../services/AccountService";

interface IMainAppState {
    user?: IUserModel;
    setUser: (user: IUserModel) => void;
}

export class MainApp extends Component<{}, IMainAppState> {
    static contextType = AccountContext;

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

    async componentDidMount() {
        const user = await AccountService.getAccount();

        if (user) {
            this.context.setUser(user);
            this.setState({
                user: user
            });
        }
    }

    render() {
        return (
            <ErrorBoundary>
                <AccountContext.Provider value={this.state}>
                    <BrowserRouter>
                        <NavMenu user={this.state.user} />

                        <div className="container-fluid body-content">
                            <div className="row">
                                <Switch>
                                    <Route exact path="/">
                                        <HomeApp />
                                    </Route>
                                    <Route path="/Card">
                                        <CardApp />
                                    </Route>
                                    <Route path="/Card/:id">
                                        <Card />
                                    </Route>
                                    <Route path="/Game">
                                        <GameApp />
                                    </Route>
                                    <Route path="/Store">
                                        <StoreApp />
                                    </Route>
                                    <Route path="/Collection">
                                        <CollectionApp />
                                    </Route>
                                    <Route path="/Deck">
                                        <DeckApp />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </AccountContext.Provider>
            </ErrorBoundary>
        );
    }
}
