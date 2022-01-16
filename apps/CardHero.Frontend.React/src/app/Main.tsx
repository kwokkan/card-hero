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
                        <Route path="/" element={<HomeApp appName={appName} routePrefix={baseUrl} />}>

                        </Route>

                        <Route path="/Card" >
                            <Route element={<CardApp routePrefix="/Card/" />}>

                            </Route>

                            <Route path=":id" element={<CardRoute />}>

                            </Route>
                        </Route>


                        <Route path="/Game">
                            <Route element={<GameApp routePrefix="/Game/" />}>

                            </Route>

                            <Route path=":id" element={<GameRoute />}>

                            </Route>
                        </Route>

                        <Route path="/Store" element={<StoreApp />}>

                        </Route>

                        <Route path="/Collection" element={<CollectionApp />}>

                        </Route>

                        <Route path="/Deck">
                            <Route element={<DeckApp routePrefix="/Deck/" />}>

                            </Route>

                            <Route path=":id" element={<DeckRoute />}>

                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
