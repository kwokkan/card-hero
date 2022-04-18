import { useNotificationContext } from "../../contexts/NotificationContextProvider";
import { NotificationItem } from "./NotificationItem";

export function NotificationWidget() {
    const context = useNotificationContext();
    const notifications = context.notifications;
    const onRemove = context.removeNotification;

    return (notifications.length > 0 &&
        <div className="notifications mr-3">
            {notifications.map((x, index) =>
                <NotificationItem key={index} message={x.message} title={x.title} type={x.type} onDismiss={() => onRemove(x)} />
            )}
        </div>
    );
}
