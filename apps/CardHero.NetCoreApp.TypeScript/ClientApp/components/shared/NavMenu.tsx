import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { IUserModel } from '../../clients/clients';
import { AccountContext } from '../../contexts/AccountContext';
import { Icon } from '../../styles/index';
import { AppBootstrap } from './AppBootstrap';
import { CoinFormat } from './CoinFormat';

interface INavMenuProps {
    user?: IUserModel;
}

export class NavMenu extends PureComponent<INavMenuProps, any> {
    static contextType = AccountContext;

    constructor(props) {
        super(props);
    }

    render() {
        const u = AppBootstrap.url;
        const user = this.props.user;

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link to={u()} className="navbar-brand">
                    <img src={u('favicon.ico')} className="d-inline-block align-top" width="32" height="32" alt={Constants.AppName} />
                    {' '}
                    {Constants.AppName}
                </Link>

                <div className="collapse navbar-collapse" id="navbar-header">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={u('Card')}>Cards</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={u('Game')}>Games</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={u('Store')}>Store</Link>
                        </li>

                        {user &&
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to={u('Collection')}>Collection</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={u('Deck')}>Decks</Link>
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
                            <a className="nav-link" href={u('swagger')} target="_blank" rel="noreferrer noopener">
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

                                            <a className="dropdown-item" href={u('SignOut')}>Logout</a>
                                        </div>
                                    </li>
                                </Fragment>
                            )
                            :
                            (
                                <li className="nav-item">
                                    <a className="nav-link" href={u('SignIn')}>Sign in</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}