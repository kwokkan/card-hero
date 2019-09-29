import React from "react";
import { Link } from "react-router-dom";
import { DeckModel } from "../../clients/clients";
import Icon from "../../styles/index";

interface IDeckListProps {
    decks: DeckModel[];
}

export default function DeckList(props: IDeckListProps) {
    return (
        <div className="row">
            <table className="table table-striped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>

                <tbody>
                    {props.decks.map(d =>
                        <tr key={d.id}>
                            <th scope="row">
                                <Icon icon="star" className={'deck-favourite' + (d.isFavourited ? ' enabled' : '')} data-deck-id={d.id} />
                                {' '}
                                <Link to={'/' + d.id}>{d.name}</Link>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}