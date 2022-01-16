import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CardApp } from "../components/card/CardApp";
import { CardRoute } from "../components/card/CardRoute";
import { CollectionApp } from "../components/collection/CollectionApp";
import { DeckApp } from "../components/deck/DeckApp";
import { DeckRoute } from "../components/deck/DeckRoute";
import { GameApp } from "../components/game/GameApp";
import { GameRoute } from "../components/game/GameRoute";
import { HomeApp } from "../components/home/HomeApp";
import { NavMenu } from "../components/shared/NavMenu";
import { NotificationWidget } from "../components/shared/NotificationWidget";
import { StoreApp } from "../components/store/StoreApp";
import { useAccountContext } from "../contexts/AccountContextProvider";
import { AccountService } from "../services/AccountService";
import { getRoutePrefix } from "../utils/route";

interface IMainProps {
    appName: string;
    baseUrl?: string;
}

export function Main(props: IMainProps) {
    const { setUser, user: contextUser } = useAccountContext();

    useEffect(() => {
        async function loadData() {
            const user = await AccountService.getAccount();

            if (user) {
                setUser(user);
            }
        }
        loadData();
    }, []);  //eslint-disable-line react-hooks/exhaustive-deps

    const appName = props.appName;
    const baseUrl = getRoutePrefix(props.baseUrl);

    return (
        <BrowserRouter basename={baseUrl}>
            <NavMenu appName={appName} user={contextUser} />

            <div className="container-fluid body-content">
                <NotificationWidget />

                <div className="row">
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeApp appName={appName} routePrefix={baseUrl} />}
                        />

                        <Route
                            path="/Card"
                            element={<CardApp routePrefix="/Card/" />}
                        >
                            <Route
                                path=":id"
                                element={<CardRoute />}
                            />
                        </Route>

                        <Route
                            path="/Game"
                            element={<GameApp routePrefix="/Game/" />}
                        >
                            <Route
                                path=":id"
                                element={<GameRoute />}
                            />
                        </Route>

                        <Route
                            path="/Store"
                            element={<StoreApp />}
                        />

                        <Route
                            path="/Collection"
                            element={<CollectionApp />}
                        />

                        <Route
                            path="/Deck"
                            element={<DeckApp routePrefix="/Deck/" />}
                        >
                            <Route
                                path=":id"
                                element={<DeckRoute />}
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
