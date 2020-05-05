import { ApiException, ErrorViewModel } from "../clients/clients";
import { INotificationContextProps } from "../contexts/NotificationContext";
import { NotificationType } from "../types/NotificationType";
import { Func } from "../types/runtime";

export async function run(context: INotificationContextProps, action: Func<Promise<void>>): Promise<void> {
    const { addNotification } = context;

    try {
        await action();
    } catch (e) {
        if (e instanceof ErrorViewModel) {
            addNotification({
                message: e.message,
                type: NotificationType.Danger
            });
        }
        else if (e instanceof ApiException) {
            addNotification({
                message: e.message,
                title: e.name,
                type: NotificationType.Danger
            });
        }
        else {
            throw e;
        }
    }
}
