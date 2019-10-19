import React, { Component } from "react";
import { IGameModel } from "../../clients/clients";
import { Layout } from "../shared/Layout";
import { GameList } from "./GameList";
import { GameSearch } from "./GameSearch";

interface IGameAppState {
    games: IGameModel[];
}

export class GameApp extends Component<any, IGameAppState> {
    constructor(props) {
        super(props);

        this.state = { games: [] };
    }

    onGamesPopulated(games: IGameModel[]) {
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