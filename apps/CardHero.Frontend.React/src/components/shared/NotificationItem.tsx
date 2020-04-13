import React, { Component } from "react";
import { INotificationItem } from "../../types/INotificationItem";

interface INotificationItemProps extends INotificationItem{
}

export class NotificationItem extends Component<INotificationItemProps, {}> {
    render() {
        return (
            <div className="notification-item alert">
                {this.props.title &&
                    <h4 className="alert-heading">{this.props.title}</h4>
                }

                <p>{this.props.message}</p>
            </div>
        );
    }
}
