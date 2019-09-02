import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppBootstrap from '../shared/appBootstrap';
import Card from './Card';
import CardApp from './CardApp';

ReactDOM.render(
    <BrowserRouter basename={AppBootstrap.url('Card')}>
        <Switch>
            <Route path="/" exact component={CardApp} />
            <Route path="/:id" component={Card} />
        </Switch>
    </BrowserRouter>,
    AppBootstrap.rootElement
);