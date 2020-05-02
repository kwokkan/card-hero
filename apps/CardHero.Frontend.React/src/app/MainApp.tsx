import React, { useState } from "react";
import { IUserModel } from "../clients/clients";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";
import { IAccountContextProps } from "../contexts/AccountContext";
import { AccountContextProvider } from "../contexts/AccountContextProvider";
import { INotificationContextProviderProps, NotificationContextProvider } from "../contexts/NotificationContextProvider";
import { NotificationType } from "../types/NotificationType";
import { getRoutePrefix } from "../utils/route";
import { Main } from "./Main";

interface IMainAppProps {
    baseUrl?: string;
}

const defaultNotification: INotificationContextProviderProps = {
    notifications: [
        {
            message: "Game will be having maintenance.",
            title: "Status update",
            type: NotificationType.Info
        }
    ]
};

export function MainApp(props: IMainAppProps) {
    const [userState, setUserState] = useState<IUserModel>();

    const contextProps: IAccountContextProps = {
        user: userState,
        setUser: setUserState
    };

    const baseUrl = getRoutePrefix(props.baseUrl);

    return (
        <ErrorBoundary>
            <AccountContextProvider value={contextProps}>
                <NotificationContextProvider value={defaultNotification}>
                    <Main baseUrl={baseUrl} />
                </NotificationContextProvider>
            </AccountContextProvider>
        </ErrorBoundary>
    );
}
