import React, { useContext } from "react";
import { IUserModel } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";

interface IGameUsersWidgetProps {
    users?: IUserModel[];
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
                {props.users && props.users.length > 0 ?
                    (
                        props.users.map(x =>
                            <li key={x.id} className={'list-group-item' + (props.currentUserId === x.id ? ' current' : '') + (user && user.id === x.id ? ' you' : '')}>
                                {props.currentUserId === x.id ?
                                    <strong title="Current player">{x.id}</strong>
                                    :
                                    (x.id)
                                }
                                {user && user.id === x.id ? ' (You)' : ''}
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
