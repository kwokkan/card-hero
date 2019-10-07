import React, { Component } from "react";
import { GameModel } from "../../clients/clients";
import Layout from "../shared/Layout";
import GameList from "./GameList";
import GameSearch from "./GameSearch";

interface IGameAppState {
    games: GameModel[];
}

export default class GameApp extends Component<any, IGameAppState> {
    constructor(props) {
        super(props);

        this.state = { games: [] };
    }

    onGamesPopulated(games: GameModel[]) {
        if (Constants.Debug) {
            if (games != null) {
                games.forEach(game => {
                    console.log(game);
                });
            }
        }

        this.setState({
            games: games
        })
    }

    render() {
        return (
            <Layout
                sideContent={<GameSearch
                    onGamesPopulated={(x) => this.onGamesPopulated(x)} />
                }
            >
                <GameList games={this.state.games} />
            </Layout>
        );
    }
}