import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppBootstrap } from "../shared/AppBootstrap";
import { Deck } from "./Deck";
import { DeckApp } from "./DeckApp";

render(
    <BrowserRouter basename={AppBootstrap.url('Deck')}>
        <Switch>
            <Route path="/" exact component={DeckApp} />
            <Route path="/:id" component={Deck} />
        </Switch>
    </BrowserRouter>,
    AppBootstrap.rootElement
);