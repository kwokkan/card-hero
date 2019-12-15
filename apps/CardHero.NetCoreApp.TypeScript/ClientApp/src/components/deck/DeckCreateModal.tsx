import React, { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";

export interface IDeckCreateModelOnCreatedProps {
    name: string;
    description?: string;
}

interface IDeckCreateModalProps {
    show: boolean;
    onCreated?: (deck: IDeckCreateModelOnCreatedProps) => void;
    onHide?: () => void;
}

interface IDeckCreateModalState {
    name?: string;
    description?: string;
    canSave: boolean;
}

export class DeckCreateModal extends Component<IDeckCreateModalProps, IDeckCreateModalState> {
    static readonly defaultState: IDeckCreateModalState = {
        name: undefined,
        description: undefined,
        canSave: false
    }

    constructor(props: IDeckCreateModalProps) {
        super(props);

        this.state = DeckCreateModal.defaultState;
    }

    onCreated() {
        this.props.onHide();

        if (this.props.onCreated) {
            const { name, description } = this.state;

            this.props.onCreated({ name, description });
        }
    }

    onInputChange(prop: KeyOfType<IDeckCreateModalState, string>, e: ChangeEvent<HTMLInputElement>) {
        const newState: IDeckCreateModalState = {
            [prop]: e.target.value
        } as any;

        this.setState(newState, () => {
            this.setState({ canSave: this.canSave() });
        });
    }

    canSave(): boolean {
        return !!this.state.name;
    }

    onExited() {
        this.setState(DeckCreateModal.defaultState);
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
                        Create Deck
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
                                        onChange={(e) => this.onInputChange("name", e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mDescription">Description</label>
                                    <input
                                        type="text"
                                        id="mDescription"
                                        className="form-control"
                                        placeholder="Description"
                                        value={this.state.description}
                                        onChange={(e) => this.onInputChange("description", e)}
                                    />
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
