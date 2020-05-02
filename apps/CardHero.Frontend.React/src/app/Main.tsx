import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Card } from "../components/card/Card";
import { CardApp } from "../components/card/CardApp";
import { CollectionApp } from "../components/collection/CollectionApp";
import { Deck } from "../components/deck/Deck";
import { DeckApp } from "../components/deck/DeckApp";
import { Game } from "../components/game/Game";
import { GameApp } from "../components/game/GameApp";
import { HomeApp } from "../components/home/HomeApp";
import { NavMenu } from "../components/shared/NavMenu";
import { NotificationWidget } from "../components/shared/NotificationWidget";
import { StoreApp } from "../components/store/StoreApp";
import { useAccountContext } from "../contexts/AccountContextProvider";
import { AccountService } from "../services/AccountService";
import { getRoutePrefix } from "../utils/route";

interface IMainProps {
    baseUrl?: string;
}

export function Main(props: IMainProps) {
    const { setUser, user } = useAccountContext();

    useEffect(() => {
        async function loadData() {
            const user = await AccountService.getAccount();

            if (user) {
                setUser(user);
            }
        }
        loadData();
    }, []);  //eslint-disable-line react-hooks/exhaustive-deps

    const appName = Constants.AppName;
    const baseUrl = getRoutePrefix(props.baseUrl);

    return (
        <BrowserRouter basename={baseUrl}>
            <NavMenu appName={appName} user={user} />

            <div className="container-fluid body-content">
                <NotificationWidget />

                <div className="row">
                    <Switch>
                        <Route exact path="/">
                            <HomeApp appName={appName} routePrefix={baseUrl} />
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
    );
}
