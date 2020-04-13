import React, { Component } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { INotificationItem } from "../../types/INotificationItem";
import { NotificationItem } from "./NotificationItem";

export class NotificationWidget extends Component {
    static contextType = NotificationContext;

    render() {
        const notifications: INotificationItem[] = this.context.notifications;
        const onRemove = this.context.removeNotification;

        return (
            (notifications.length > 0 &&
                <div className="notifications text-center">
                    {notifications.map((x, index) =>
                        <NotificationItem key={index} message={x.message} title={x.title} type={x.type} onDismiss={() => onRemove(x)} />
                    )}
                </div>
            )
        );
    }
}
