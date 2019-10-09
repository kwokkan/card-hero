import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import Game from './Game';
import GameApp from './GameApp';

ReactDOM.render(
    <BrowserRouter basename={AppBootstrap.url('Game')}>
        <Switch>
            <Route path="/" exact component={GameApp} />
            <Route path="/:id" component={Game} />
        </Switch>
    </BrowserRouter>,
    AppBootstrap.rootElement
);