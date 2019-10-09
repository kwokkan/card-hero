import React from 'react';
import ReactDOM from 'react-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import { StoreApp } from './StoreApp';

ReactDOM.render(
    <StoreApp />,
    AppBootstrap.rootElement
);