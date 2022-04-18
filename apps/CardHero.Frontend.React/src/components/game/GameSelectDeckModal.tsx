import { ChangeEvent, useState } from "react";
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
}

export function GameSelectDeckModal(props: IGameSelectDeckModalProps): JSX.Element | null {
    const [deckId, setDeckId] = useState<Nullable<number>>();
    const [canJoin, setCanJoin] = useState<boolean>(false);

    const onJoined = () => {
        props.onHide();

        if (props.onJoined) {
            props.onJoined({
                deckId,
                gameId: props.game.id
            });
        }
    };

    const onSelectChange = (prop: KeyOfType<IGameSelectDeckModalState, number>, e: ChangeEvent<HTMLSelectElement>) => {
        const newState: IGameSelectDeckModalState = {
            [prop]: parseInt(e.target.value)
        } as any;

        setDeckId(newState.deckId);
        setCanJoin(!!deckId);
    };

    const onExited = () => {
        setDeckId(undefined);
        setCanJoin(false);
    };

    if (!props.game) {
        return null;
    }

    return (
        <Modal
            {...props}
            onExited={() => onExited}
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
                                Join game <strong>#{props.game.id}</strong>?
                            </div>

                            <div className="form-group">
                                <label htmlFor="mDeckId">Deck</label>
                                <select
                                    id="mDeckId"
                                    className="form-control"
                                    value={deckId}
                                    onChange={(e) => onSelectChange("deckId", e)}
                                >
                                    <option>Please select</option>
                                    {props.decks.map(x =>
                                        <option key={x.id} value={x.id}>{x.name}</option>
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
                    onClick={() => onJoined()}
                    disabled={!canJoin}
                >Join</button>
            </Modal.Footer>
        </Modal>
    );
}