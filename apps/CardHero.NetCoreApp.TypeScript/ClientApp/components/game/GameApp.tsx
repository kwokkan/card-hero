import React, { Component, Fragment } from "react";
import { IDeckModel, IGameModel } from "../../clients/clients";
import { DeckService } from "../../services/DeckService";
import { GameList } from "./GameList";
import { GameSearch } from "./GameSearch";

interface IGameAppState {
    games: IGameModel[];
    decks: IDeckModel[];
}

export class GameApp extends Component<any, IGameAppState> {
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
            <Fragment>
                <div className="col-lg-2">
                    <GameSearch
                        decks={this.state.decks}
                        onGamesPopulated={(x) => this.onGamesPopulated(x)} />
                </div>
                <div className="col-lg-10">
                    <GameList
                        games={this.state.games}
                        decks={this.state.decks}
                    />
                </div>
            </Fragment>
        );
    }
}
