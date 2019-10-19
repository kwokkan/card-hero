import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import { Card } from './Card';
import { CardApp } from './CardApp';

render(
    <BrowserRouter basename={AppBootstrap.url('Card')}>
        <Switch>
            <Route path="/" exact component={CardApp} />
            <Route path="/:id" component={Card} />
        </Switch>
    </BrowserRouter>,
    AppBootstrap.rootElement
);