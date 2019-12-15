import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { IUserModel } from '../../clients/clients';
import { Icon } from '../../styles/index';
import { getRoutePrefix } from '../../utils/route';
import { CoinFormat } from './CoinFormat';

interface INavMenuProps {
    appName: string;
    routePrefix?: string;
    user?: IUserModel;
}

export class NavMenu extends PureComponent<INavMenuProps, any> {
    constructor(props: INavMenuProps) {
        super(props);
    }

    render() {
        const appName = this.props.appName;
        const routePrefix = getRoutePrefix(this.props.routePrefix);
        const user = this.props.user;

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation">
                    <Icon icon="bars" />
                </button>

                <Link to={routePrefix} className="navbar-brand">
                    <img src={`${routePrefix}favicon.ico`} className="d-inline-block align-top" width="32" height="32" alt={appName} />
                    {' '}
                    {appName}
                </Link>

                <div className="collapse navbar-collapse" id="navbar-header">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={`${routePrefix}Card`}>Cards</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={`${routePrefix}Game`}>Games</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={`${routePrefix}Store`}>Store</Link>
                        </li>

                        {user &&
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`${routePrefix}Collection`}>Collection</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={`${routePrefix}Deck`}>Decks</Link>
                                </li>
                            </Fragment>
                        }
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/kwokkan/card-hero" target="_blank" rel="noreferrer noopener">
                                <Icon icon="github" />
                                {' '}
                                Fork me
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`${routePrefix}swagger`} target="_blank" rel="noreferrer noopener">
                                <Icon icon="code" />
                                {' '}
                                API
                            </a>
                        </li>

                        {user ?
                            (
                                <Fragment>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <CoinFormat coins={user.coins} title={`You have ${user.coins} coins`} />
                                        </a>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" id="user-navbar-dropdown-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {user.fullName}
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="user-navbar-dropdown-menu">
                                            <a className="dropdown-item" href="#">Profile</a>
                                            <a className="dropdown-item" href="#">Active Games</a>

                                            <div className="dropdown-divider"></div>

                                            <a className="dropdown-item" href="#">Settings</a>

                                            <div className="dropdown-divider"></div>

                                            <a className="dropdown-item" href={`${routePrefix}SignOut`}>Logout</a>
                                        </div>
                                    </li>
                                </Fragment>
                            )
                            :
                            (
                                <li className="nav-item">
                                    <a className="nav-link" href={`${routePrefix}SignIn`}>Sign in</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}
