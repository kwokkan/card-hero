import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getRoutePrefix } from '../../utils/route';

interface IHomeProps {
    appName: string;
    routePrefix?: string;
}

export function Home(props: IHomeProps): JSX.Element {
    const appName = props.appName;
    const routePrefix = getRoutePrefix(props.routePrefix);

    return (
        <Fragment>
            <div className="jumbotron text-center">
                <h1 className="display-3">{appName}</h1>

                <p className="lead">
                    {appName} is a dynamic action game.
                </p>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Cards</h4>
                            <p className="card-text">Discover over 1000 cards.</p>
                            <Link className="btn btn-primary" to={`${routePrefix}Card`}>View Cards</Link>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Decks</h4>
                            <p className="card-text">Create you own decks.</p>
                            <Link className="btn btn-primary" to={`${routePrefix}Deck`}>View Decks</Link>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Battle</h4>
                            <p className="card-text">Battle against other players.</p>
                            <Link className="btn btn-primary" to={`${routePrefix}Game`}>View Games</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
