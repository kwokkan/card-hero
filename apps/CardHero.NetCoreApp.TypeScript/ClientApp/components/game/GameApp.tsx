import React, { Component } from "react";
import DeckModel from "../../models/DeckModel";
import GameModel from "../../models/GameModel";
import DeckService from "../../services/DeckService";
import Layout from "../shared/Layout";
import GameList from "./GameList";
import GameSearch from "./GameSearch";

interface IGameAppState {
    games: GameModel[];
    decks: DeckModel[];
}

export default class GameApp extends Component<any, IGameAppState> {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            decks: []
        };
    }

    private async getDecks() {
        const decks = await DeckService.getDecks();

        if (Constants.Debug) {
            if (decks != null) {
                decks.forEach(deck => {
                    console.log(deck);
                })
            }
        }

        this.setState({
            decks: decks
        });
    }

    async componentDidMount() {
        await this.getDecks();
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
                    decks={this.state.decks}
                    onGamesPopulated={(x) => this.onGamesPopulated(x)} />
                }
            >
                <GameList
                    games={this.state.games}
                    decks={this.state.decks}
                />
            </Layout>
        );
    }
}