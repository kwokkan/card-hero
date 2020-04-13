import React from "react";
import { INotificationItem } from "../types/INotificationItem";

export interface INotificationContextProps {
    notifications: INotificationItem[];
    addNotification: (notification: INotificationItem) => void;
    removeNotification: (notification: INotificationItem) => void;
}

export const NotificationContext = React.createContext<INotificationContextProps>({
    notifications: [],
    addNotification: (_notification: INotificationItem) => { },
    removeNotification: (_notification: INotificationItem) => { }
});
