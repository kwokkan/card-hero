import React, { PureComponent } from 'react';
import { Layout } from '../shared/Layout';
import { Home } from './Home';

export class HomeApp extends PureComponent {
    render() {
        return (
            <Layout>
                <Home />
            </Layout>
        );
    }
}