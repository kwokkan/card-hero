import React, { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";
import { IDeckModel, IGameModel } from "../../clients/clients";

export interface IGameSelectDeckModalOnJoinedProps {
    gameId: number;
    deckId: number;
}

interface IGameSelectDeckModalProps {
    show: boolean;
    onJoined?: (model: IGameSelectDeckModalOnJoinedProps) => void;
    onHide?: () => void;
    decks: IDeckModel[];
    game: IGameModel;
}

interface IGameSelectDeckModalState {
    deckId?: number;
    canJoin: boolean;
}

export class GameSelectDeckModal extends Component<IGameSelectDeckModalProps, IGameSelectDeckModalState> {
    static readonly defaultState: IGameSelectDeckModalState = {
        deckId: undefined,
        canJoin: false
    }

    constructor(props: IGameSelectDeckModalProps) {
        super(props);

        this.state = {
            canJoin: false
        };
    }

    onJoined() {
        this.props.onHide();

        if (this.props.onJoined) {
            const { deckId } = this.state;

            this.props.onJoined({
                deckId,
                gameId: this.props.game.id
            });
        }
    }

    onSelectChange(prop: KeyOfType<IGameSelectDeckModalState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: IGameSelectDeckModalState = {
            [prop]: parseInt(e.target.value)
        } as any;

        this.setState(newState, () => {
            this.setState({ canJoin: this.canJoin() });
        });
    }

    canJoin(): boolean {
        return !!this.state.deckId;
    }

    onExited() {
        this.setState(GameSelectDeckModal.defaultState);
    }

    render() {
        if (!this.props.game) {
            return null;
        }

        return (
            <Modal
                {...this.props}
                onExited={() => this.onExited}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Join Game
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="container">
                            <form className="form auto-post">
                                <div className="form-group">
                                    Join game <strong>{this.props.game.name}</strong>?
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mDeckId">Deck</label>
                                    <select
                                        id="mDeckId"
                                        className="form-control"
                                        value={this.state.deckId}
                                        onChange={(e) => this.onSelectChange("deckId", e)}
                                    >
                                        <option>Please select</option>
                                        {this.props.decks.map(x =>
                                            <option key={x.id} value={x.id}>{x.name}</option>
                                        )}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={this.props.onHide}>Close</button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.onJoined()}
                        disabled={!this.state.canJoin}
                    >Join</button>
                </Modal.Footer>
            </Modal>
        );
    }
}
