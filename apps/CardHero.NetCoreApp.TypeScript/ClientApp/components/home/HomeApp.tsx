import React, { PureComponent } from 'react';
import { Home } from './Home';

export class HomeApp extends PureComponent {
    render() {
        return (
            <div className="col-lg-12">
                <Home />
            </div>
        );
    }
}