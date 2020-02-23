import React, { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";
import { GameType, IDeckModel } from "../../clients/clients";

export interface IGameCreateModalOnCreatedProps {
    type: GameType;
    deckId: number;
}

interface IGameCreateModalProps {
    show: boolean;
    onCreated?: (model: IGameCreateModalOnCreatedProps) => void;
    onHide?: () => void;
    decks: IDeckModel[];
}

interface IGameCreateModalState {
    type?: GameType;
    deckId?: number;
    canSave: boolean;
}

export class GameCreateModal extends Component<IGameCreateModalProps, IGameCreateModalState> {
    static readonly defaultState: IGameCreateModalState = {
        type: GameType.Standard,
        deckId: undefined,
        canSave: false
    }

    constructor(props: IGameCreateModalProps) {
        super(props);

        this.state = GameCreateModal.defaultState;
    }

    onCreated() {
        this.props.onHide();

        if (this.props.onCreated) {
            const { type, deckId } = this.state;

            this.props.onCreated({ type, deckId });
        }
    }

    onInputChange(prop: KeyOfType<IGameCreateModalState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState = {
            [prop]: e.target.value
        } as any;

        this.setState(newState, () => {
            this.setState({ canSave: this.canSave() });
        });
    }

    onSelectChange(prop: KeyOfType<IGameCreateModalState, number>, e: ChangeEvent<HTMLSelectElement>) {
        const newState: IGameCreateModalState = {
            [prop]: parseInt(e.target.value)
        } as any;

        this.setState(newState, () => {
            this.setState({ canSave: this.canSave() });
        });
    }

    canSave(): boolean {
        return !!this.state.type && !!this.state.deckId;
    }

    onExited() {
        this.setState(GameCreateModal.defaultState);
    }

    render() {
        return (
            <Modal
                {...this.props}
                onExited={() => this.onExited}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create Game
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="container">
                            <form className="form auto-post">
                                <div className="form-group">
                                    <label htmlFor="mDeckId">Deck</label>
                                    <select
                                        id="mDeckId"
                                        className="form-control"
                                        value={this.state.deckId as any}
                                        onChange={(e) => this.onSelectChange("deckId", e)}
                                    >
                                        <option>Please select</option>
                                        {this.props.decks.map(x =>
                                            <option key={x.id as any} value={x.id as any}>{x.name}</option>
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
                        onClick={() => this.onCreated()}
                        disabled={!this.state.canSave}
                    >OK</button>
                </Modal.Footer>
            </Modal>
        );
    }
}
