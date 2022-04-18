import { Link } from "react-router-dom";
import { IDeckModel } from "../../clients/clients";
import { Icon } from "../../styles/index";
import { getRoutePrefix } from "../../utils/route";

interface IDeckListProps {
    decks: IDeckModel[];
    routePrefix?: string;
}

export function DeckList(props: IDeckListProps): JSX.Element {
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
