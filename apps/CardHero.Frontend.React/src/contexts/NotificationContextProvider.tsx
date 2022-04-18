import { ProviderProps, useContext, useState } from "react";
import { INotificationItem } from "../types/INotificationItem";
import { INotificationContextProps, NotificationContext } from "./NotificationContext";

export interface INotificationContextProviderProps {
    notifications?: INotificationItem[];
}

function NotificationContextProvider(props: ProviderProps<INotificationContextProviderProps>): JSX.Element {
    const [notificationsState, setNotificationsState] = useState<INotificationItem[]>((props.value || {}).notifications || []);

    const contextProps: INotificationContextProps = {
        addNotification: (notification: INotificationItem) => {
            const newNotifications = [...notificationsState];
            newNotifications.push(notification);

            setNotificationsState(newNotifications);
        },
        removeNotification: (notification) => {
            const notifications = [...notificationsState];
            const index = notifications.indexOf(notification);

            if (index > -1) {
                notifications.splice(index, 1);

                setNotificationsState(notifications);
            }
        },
        notifications: notificationsState
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
