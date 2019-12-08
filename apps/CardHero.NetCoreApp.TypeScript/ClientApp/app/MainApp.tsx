﻿import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IUserModel } from "../clients/clients";
import { Card } from "../components/card/Card";
import { CardApp } from "../components/card/CardApp";
import { CollectionApp } from "../components/collection/CollectionApp";
import { Deck } from "../components/deck/Deck";
import { DeckApp } from "../components/deck/DeckApp";
import { Game } from "../components/game/Game";
import { GameApp } from "../components/game/GameApp";
import { HomeApp } from "../components/home/HomeApp";
import { AppBootstrap } from "../components/shared/AppBootstrap";
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
                    <BrowserRouter basename={AppBootstrap.url()}>
                        <NavMenu appName={Constants.AppName} user={this.state.user} />

                        <div className="container-fluid body-content">
                            <div className="row">
                                <Switch>
                                    <Route exact path="/">
                                        <HomeApp />
                                    </Route>

                                    <Route path="/Card"
                                        render={({ match: { path } }) => (
                                            <Fragment>
                                                <Route exact path={`${path}/`}>
                                                    <CardApp routePrefix={path} />
                                                </Route>

                                                <Route path={`${path}/:id`}
                                                    render={({ match: { params, url } }) => (
                                                        <Route exact path={url}>
                                                            <Card id={params.id as number} />
                                                        </Route>
                                                    )}>
                                                </Route>
                                            </Fragment>
                                        )}>
                                    </Route>


                                    <Route path="/Game"
                                        render={({ match: { path } }) => (
                                            <Fragment>
                                                <Route exact path={`${path}/`}>
                                                    <GameApp routePrefix={path} />
                                                </Route>

                                                <Route path={`${path}/:id`}
                                                    render={({ match: { params, url } }) => (
                                                        <Route exact path={url}>
                                                            <Game id={params.id as number} />
                                                        </Route>
                                                    )}>
                                                </Route>
                                            </Fragment>
                                        )}>
                                    </Route>

                                    <Route path="/Store">
                                        <StoreApp />
                                    </Route>

                                    <Route path="/Collection">
                                        <CollectionApp />
                                    </Route>

                                    <Route path="/Deck"
                                        render={({ match: { path } }) => (
                                            <Fragment>
                                                <Route exact path={`${path}/`}>
                                                    <DeckApp routePrefix={path} />
                                                </Route>

                                                <Route path={`${path}/:id`}
                                                    render={({ match: { params, url } }) => (
                                                        <Route exact path={url}>
                                                            <Deck id={params.id as number} />
                                                        </Route>
                                                    )}>
                                                </Route>
                                            </Fragment>
                                        )}>
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
