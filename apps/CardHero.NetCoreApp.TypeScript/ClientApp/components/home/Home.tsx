import React, { Fragment } from 'react';
import Constants from '../../constants/constants';
import AppBootstrap from '../shared/appBootstrap';

export function Home() {
    const l = AppBootstrap.url;
    return (
        <Fragment>
            <div className="jumbotron">
                <h1 className="display-3">{Constants.AppName}</h1>

                <p className="lead">
                    {Constants.AppName} is a dynamic action game.
                    </p>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Cards</h4>
                            <p className="card-text">Discover over 1000 cards.</p>
                            <a className="btn btn-primary" href={l("Card")}>View Cards</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Decks</h4>
                            <p className="card-text">Create you own decks.</p>
                            <a className="btn btn-primary" href={l("Deck")}>View Decks</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Battle</h4>
                            <p className="card-text">Battle against other players.</p>
                            <a className="btn btn-primary" href={l("Game")}>View Games</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}