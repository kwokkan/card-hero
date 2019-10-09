import React from 'react';
import ReactDOM from 'react-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import { HomeApp } from './HomeApp';

ReactDOM.render(
    <HomeApp />,
    AppBootstrap.rootElement
);