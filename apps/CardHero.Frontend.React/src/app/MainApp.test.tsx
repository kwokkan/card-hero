/*
 * @jest-environment jsdom
 */
import React from "react";
import renderer from "react-test-renderer";
import { INotificationItem } from "../types/INotificationItem";
import { NotificationType } from "../types/NotificationType";
import { MainApp } from "./MainApp";

test("<MainApp /> renders correctly without notifications", () => {
    const tree = renderer
        .create(
            <MainApp appName="Test app" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<MainApp /> renders correctly with notifications", () => {
    const notifications: INotificationItem[] = [
        {
            message: "My info message",
            title: "My info title",
            type: NotificationType.Info
        },
        {
            message: "My danger message",
            title: "My danger message",
            type: NotificationType.Danger
        }
    ];
    const tree = renderer
        .create(
            <MainApp appName="Test app" defaultNotifications={notifications} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
