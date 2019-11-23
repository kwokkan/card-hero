import React from "react";
import { Link } from "react-router-dom";
import { IDeckModel } from "../../clients/clients";
import { Icon } from "../../styles/index";

interface IDeckListProps {
    routePrefix?: string;
    decks: IDeckModel[];
}

const getRoutePrefix = (prefix?: string): string => {
    if (!prefix) {
        return "/";
    }

    if (prefix.endsWith("/")) {
        return prefix;
    }

    return prefix + "/";
}

export function DeckList(props: IDeckListProps) {
    const routePrefix = getRoutePrefix(props.routePrefix);

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
                                <Link to={routePrefix + d.id}>{d.name}</Link>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
