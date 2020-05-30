import { NotificationType } from "./NotificationType";

export interface INotificationItem {
    title?: string;
    message: string | JSX.Element;
    type?: NotificationType;
}
