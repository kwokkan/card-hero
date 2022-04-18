import { ChangeEvent, useState } from "react";
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
}

const defaultState: IGameCreateModalState = {
    type: GameType.Standard,
};

export function GameCreateModal(props: IGameCreateModalProps) {
    const [state, setState] = useState<IGameCreateModalState>(defaultState);
    const [canSave, setCanSave] = useState<boolean>(false);

    const onCreated = () => {
        props.onHide();

        if (props.onCreated) {
            const { type, deckId } = state;

            props.onCreated({ type, deckId });
        }
    };

    const onSelectChange = (prop: KeyOfType<IGameCreateModalState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: IGameCreateModalState = {
            [prop]: parseInt(e.target.value)
        } as any;

        setState(newState);
        setCanSave(canSaveFunc());
    };

    const canSaveFunc = (): boolean => {
        return !!state.type && !!state.deckId;
    };

    const onExited = () => {
        setState(defaultState);
    };

    return (
        <Modal
            {...props}
            onExited={() => onExited}
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
                                    value={state.deckId as any}
                                    onChange={(e) => onSelectChange("deckId", e)}
                                >
                                    <option>Please select</option>
                                    {props.decks.map(x =>
                                        <option key={x.id as any} value={x.id as any}>{x.name}</option>
                                    )}
                                </select>
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
