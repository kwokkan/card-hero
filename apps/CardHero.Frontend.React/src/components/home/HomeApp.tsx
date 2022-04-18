import { Home } from './Home';

interface IHomeAppProps {
    appName: string;
    routePrefix?: string;
}

export function HomeApp(props: IHomeAppProps): JSX.Element {
    return (
        <div className="col-lg-12">
            <Home appName={props.appName} routePrefix={props.routePrefix} />
        </div>
    );
}
