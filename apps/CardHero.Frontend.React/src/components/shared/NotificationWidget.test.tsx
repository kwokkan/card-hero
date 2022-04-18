import renderer from "react-test-renderer";
import { INotificationContextProviderProps, NotificationContextProvider } from "../../contexts/NotificationContextProvider";
import { NotificationType } from "../../types/NotificationType";
import { NotificationWidget } from "./NotificationWidget";

test("<NotificationWidget /> renders with NotificationContextProvider and null notifications", () => {
    const tree = renderer
        .create(
            <NotificationContextProvider value={null}>
                <NotificationWidget />
            </NotificationContextProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NotificationWidget /> renders with NotificationContextProvider and default notifications", () => {
    const defaultProps: INotificationContextProviderProps = {
        notifications: [
            {
                message: "Test message",
                title: "Test title",
                type: NotificationType.Info
            },
            {
                message: "Danger message",
                title: "Danger title",
                type: NotificationType.Danger
            }
        ]
    };
    const tree = renderer
        .create(
            <NotificationContextProvider value={defaultProps}>
                <NotificationWidget />
            </NotificationContextProvider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
