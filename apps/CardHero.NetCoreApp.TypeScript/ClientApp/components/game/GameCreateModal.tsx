﻿import React, { ChangeEvent, Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { GameType } from "../../clients/clients";
import DeckModel, { DeckId } from "../../models/DeckModel";
import { nameof } from "../../utils/nameof";

export interface IGameCreateModalOnCreatedProps {
    name: string;
    type: GameType;
    deckId: DeckId;
}

interface IGameCreateModalProps {
    show: boolean;
    onCreated?: (model: IGameCreateModalOnCreatedProps) => void;
    onHide?: () => void;
    decks: DeckModel[];
}

interface IGameCreateModalState {
    name?: string;
    type?: GameType;
    deckId?: DeckId;
    canSave: boolean;
}

export default class GameCreateModal extends Component<IGameCreateModalProps, IGameCreateModalState> {
    static readonly defaultState: IGameCreateModalState = {
        name: undefined,
        type: GameType.TripleTriad,
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
            const { name, type, deckId } = this.state;

            this.props.onCreated({ name, type, deckId });
        }
    }

    onInputChange(prop: string, e: ChangeEvent<HTMLInputElement>) {
        const newState = {};
        newState[prop] = e.target.value;

        this.setState(newState, () => {
            this.setState({ canSave: this.canSave() });
        });
    }

    onSelectChange(prop: string, e: ChangeEvent<HTMLSelectElement>) {
        const newState = {};
        newState[prop] = parseInt(e.target.value);

        this.setState(newState, () => {
            this.setState({ canSave: this.canSave() });
        });
    }

    canSave(): boolean {
        return !!this.state.name && !!this.state.type && !!this.state.deckId;
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
                                    <label htmlFor="mName">Name</label>
                                    <input
                                        type="text"
                                        id="mName"
                                        className="form-control"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={(e) => this.onInputChange(nameof<IGameCreateModalState>('name'), e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mType">Type</label>
                                    <select
                                        id="mType"
                                        className="form-control"
                                        value={this.state.type}
                                        onChange={(e) => this.onSelectChange(nameof<IGameCreateModalState>('type'), e)}
                                    >
                                        <option value="1">Triple Triad</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mDeckId">Deck</label>
                                    <select
                                        id="mDeckId"
                                        className="form-control"
                                        value={this.state.deckId as any}
                                        onChange={(e) => this.onSelectChange(nameof<IGameCreateModalState>('deckId'), e)}
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
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button
                        onClick={() => this.onCreated()}
                        disabled={!this.state.canSave}
                    >OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}