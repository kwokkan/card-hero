import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import CollectionApp from './CollectionApp';

ReactDOM.render(
    <BrowserRouter basename={AppBootstrap.url('Collection')}>
        <Switch>
            <Route path="/" exact component={CollectionApp} />
        </Switch>
    </BrowserRouter>,
    AppBootstrap.rootElement
);