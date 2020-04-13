import React, { useContext, useState } from "react";
import { INotificationItem } from "../types/INotificationItem";
import { NotificationType } from "../types/NotificationType";
import { INotificationContextProps, NotificationContext } from "./NotificationContext";

interface INotificationContextProviderState {
    notifications: INotificationItem[];
}

function NotificationContextProvider(props: any) {
    const [state, setState] = useState<INotificationContextProviderState>({
        notifications: [
            {
                message: "Game will be having maintenance.",
                title: "Status update",
                type: NotificationType.Info
            }
        ]
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
            {...props}
        />
    );
}

function useNotificationContext() {
    return useContext(NotificationContext);
}

export { NotificationContextProvider, useNotificationContext };
