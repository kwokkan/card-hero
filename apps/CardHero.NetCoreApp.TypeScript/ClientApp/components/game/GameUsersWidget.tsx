import React, { useContext } from "react";
import { IGameUserModel, IUserModel } from "../../clients/clients";
import { AccountContext } from "../../contexts/AccountContext";

interface IGameUsersWidgetProps {
    users?: IGameUserModel[];
    currentGameUserId?: number;
}

export function GameUsersWidget(props: IGameUsersWidgetProps) {
    const context = useContext(AccountContext);

    const getCurrentGameUserId = (currentUser: IUserModel, users: IGameUserModel[]): number | null => {
        if (currentUser) {
            return null;
        }

        if (!users) {
            return null;
        }

        const user = users.find(x => x.userId == currentUser.id);

        if (!user) {
            return null;
        }

        return user.id;
    };

    const user = context.user;
    const currentGameUserId = getCurrentGameUserId(user, props.users);

    return (
        <div className="card">
            <h4 className="card-header">
                Players
            </h4>
            {props.users && props.users.length > 0 ?
                (
                    <ul className="list-group list-group-flush" data-current-game-user-id={currentGameUserId} data-xxx={props.currentGameUserId}>
                        {props.users.map(x =>
                            <li key={x.id} className={'list-group-item' + (props.currentGameUserId === x.id ? ' current' : '') + (user && user.id === x.userId ? ' you' : '')}>
                                {props.currentGameUserId === x.id ?
                                    <strong title="Current player">{x.id}</strong>
                                    :
                                    (x.id)
                                }
                                {user && user.id === x.userId ? ' (You)' : ''}
                            </li>
                        )}
                    </ul>
                )
                :
                (
                    <p>No players</p>
                )
            }
        </div>
    );
}