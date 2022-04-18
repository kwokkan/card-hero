import { useContext } from "react";
import { AccountContext } from "../../contexts/AccountContext";

interface IGameUsersWidgetProps {
    userIds?: number[];
    currentUserId?: number;
}

export function GameUsersWidget(props: IGameUsersWidgetProps) {
    const context = useContext(AccountContext);

    const user = context.user;

    return (
        <div className="card">
            <h4 className="card-header">
                Players
            </h4>
            <ul className="list-group list-group-flush" >
                {props.userIds && props.userIds.length > 0 ?
                    (
                        props.userIds.map(x =>
                            <li key={x} className={'list-group-item' + (props.currentUserId === x ? ' current' : '') + (user && user.id === x ? ' you' : '')}>
                                {props.currentUserId === x ?
                                    <strong title="Current player">{x}</strong>
                                    :
                                    (x)
                                }
                                {user && user.id === x ? ' (You)' : ''}
                            </li>
                        )
                    )
                    :
                    (
                        <li className="list-group-item">No players</li>
                    )
                }
            </ul>
        </div>
    );
}
