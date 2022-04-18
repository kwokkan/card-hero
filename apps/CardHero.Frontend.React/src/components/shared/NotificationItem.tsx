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

export function NotificationItem(props: INotificationItemProps) {
    const typeClass = typeToCss(props.type);

    return (
        <div className={"notification-item toast fade show"}>
            <div className="toast-header">
                <span className={"badge badge-pill badge-secondary mr-2 " + typeClass}>&nbsp;</span>

                <strong className="mr-auto">{props.title}</strong>

                <button type="button" className="ml-2 mb-1 close" aria-label="Close" onClick={() => props.onDismiss()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <p className="toast-body">{props.message}</p>
        </div>
    );
}
