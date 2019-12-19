import React from 'react';
import { Home } from './Home';

interface IHomeAppProps {
    appName: string;
    routePrefix?: string;
}

export function HomeApp(props: IHomeAppProps) {
    return (
        <div className="col-lg-12">
            <Home appName={props.appName} routePrefix={props.routePrefix} />
        </div>
    );
}
