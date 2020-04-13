import React, { Component } from "react";
import { INotificationItem } from "../../types/INotificationItem";
import { NotificationType } from "../../types/NotificationType";

function typeToCss(type: NotificationType): string {
    switch (type) {
        case NotificationType.Danger:
            return "alert-danger";
        case NotificationType.Info:
            return "alert-info";
        case NotificationType.Success:
            return "alert-success";
        case NotificationType.Warning:
            return "alert-warning";
        default:
            return "alert-primary";
    }
}

export class NotificationItem extends Component<INotificationItem, {}> {
    render() {
        const typeClass = typeToCss(this.props.type);

        return (
            <div className={"notification-item alert " + typeClass}>
                {this.props.title &&
                    <h4 className="alert-heading">{this.props.title}</h4>
                }

                <p>{this.props.message}</p>
            </div>
        );
    }
}
