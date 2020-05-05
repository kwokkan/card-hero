import React, { Component } from "react";
import { INotificationItem } from "../../types/INotificationItem";
import { NotificationType } from "../../types/NotificationType";

interface INotificationItemProps extends INotificationItem {
    onDismiss: () => void;
}

function typeToCss(type: NotificationType): string {
    switch (type) {
        case NotificationType.Danger:
            return "badge-danger";
        case NotificationType.Info:
            return "badge-info";
        case NotificationType.Success:
            return "badge-success";
        case NotificationType.Warning:
            return "badge-warning";
        default:
            return "badge-primary";
    }
}

export class NotificationItem extends Component<INotificationItemProps, {}> {
    render() {
        const typeClass = typeToCss(this.props.type);

        return (
            <div className={"notification-item toast fade show"}>
                <div className="toast-header">
                    <span className={"badge badge-pill badge-secondary mr-2 " + typeClass}>&nbsp;</span>

                    <strong className="mr-auto">{this.props.title}</strong>

                    <button type="button" className="ml-2 mb-1 close" aria-label="Close" onClick={() => this.props.onDismiss()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <p className="toast-body">{this.props.message}</p>
            </div>
        );
    }
}
