import React from 'react';
import { render } from 'react-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import { StoreApp } from './StoreApp';

render(
    <StoreApp />,
    AppBootstrap.rootElement
);