import React, { ProviderProps, useContext, useState } from "react";
import { INotificationItem } from "../types/INotificationItem";
import { INotificationContextProps, NotificationContext } from "./NotificationContext";

export interface INotificationContextProviderProps {
    notifications?: INotificationItem[];
}

interface INotificationContextProviderState {
    notifications: INotificationItem[];
}

function NotificationContextProvider(props: ProviderProps<INotificationContextProviderProps>): JSX.Element {
    const [state, setState] = useState<INotificationContextProviderState>({
        notifications: (props.value || {}).notifications || []
    });

    const contextProps: INotificationContextProps = {
        addNotification: (notification: INotificationItem) => {
            const newNotifications = [...state.notifications];
            newNotifications.push(notification);

            const newState: INotificationContextProviderState = {
                notifications: newNotifications
            };

            setState(prevState => {
                return { ...prevState, ...newState };
            })
        },
        removeNotification: (notification) => {
            const notifications = [...state.notifications];
            const index = notifications.indexOf(notification);

            if (index > -1) {
                notifications.splice(index, 1);

                const newState: INotificationContextProviderState = {
                    notifications: notifications
                };

                setState(prevState => {
                    return { ...prevState, ...newState };
                })
            }
        },
        notifications: state.notifications
    };

    return (
        <NotificationContext.Provider
            value={contextProps}
            children={props.children}
        />
    );
}

function useNotificationContext() {
    return useContext(NotificationContext);
}

export { NotificationContextProvider, useNotificationContext };
