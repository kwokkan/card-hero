import renderer from "react-test-renderer";
import { NotificationType } from "../../types/NotificationType";
import { NotificationItem } from "./NotificationItem";

test("<NotificationItem /> renders without title", () => {
    const tree = renderer
        .create(
            <NotificationItem message={"Test message"} onDismiss={null} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NotificationItem /> renders with title and message", () => {
    const tree = renderer
        .create(
            <NotificationItem message={"Test message"} title={"Test title"} onDismiss={null} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NotificationItem /> renders with title, message and custom type", () => {
    const tree = renderer
        .create(
            <NotificationItem message={"Test message"} title={"Test title"} type={NotificationType.Danger} onDismiss={null} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
