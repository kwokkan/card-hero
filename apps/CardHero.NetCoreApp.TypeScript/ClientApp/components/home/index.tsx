import React from 'react';
import { render } from 'react-dom';
import { AppBootstrap } from '../shared/AppBootstrap';
import { HomeApp } from './HomeApp';

render(
    <HomeApp />,
    AppBootstrap.rootElement
);