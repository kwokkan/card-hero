import { ChangeEvent, useState } from "react";
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
}

export function DeckCreateModal(props: IDeckCreateModalProps): JSX.Element {
    const [search, setSearch] = useState<IDeckCreateModalState>({});
    const [canSave, setCanSave] = useState<boolean>(false);

    const onCreated = () => {
        props.onHide();

        if (props.onCreated) {
            props.onCreated({ name: search.name, description: search.description });
        }
    };

    const onInputChange = (prop: KeyOfType<IDeckCreateModalState, string>, e: ChangeEvent<HTMLInputElement>) => {
        const newState: IDeckCreateModalState = {
            [prop]: e.target.value
        } as any;

        setSearch(newState);
        setCanSave(!!newState.name);
    };

    const onExited = () => {
        setSearch({});
        setCanSave(false);
    };

    return (
        <Modal
            {...props}
            onExited={() => onExited}
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
                                    value={search.name}
                                    onChange={(e) => onInputChange("name", e)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mDescription">Description</label>
                                <input
                                    type="text"
                                    id="mDescription"
                                    className="form-control"
                                    placeholder="Description"
                                    value={search.description}
                                    onChange={(e) => onInputChange("description", e)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={props.onHide}>Close</button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => onCreated()}
                    disabled={!canSave}
                >OK</button>
            </Modal.Footer>
        </Modal>
    );
}
