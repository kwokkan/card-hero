import { useState } from "react";
import { IUserModel } from "../clients/clients";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";
import { IAccountContextProps } from "../contexts/AccountContext";
import { AccountContextProvider } from "../contexts/AccountContextProvider";
import { INotificationContextProviderProps, NotificationContextProvider } from "../contexts/NotificationContextProvider";
import { INotificationItem } from "../types/INotificationItem";
import { getRoutePrefix } from "../utils/route";
import { Main } from "./Main";

interface IMainAppProps {
    appName: string;
    baseUrl?: string;
    defaultNotifications?: INotificationItem[];
}

export function MainApp(props: IMainAppProps) {
    const [userState, setUserState] = useState<IUserModel>();

    const contextProps: IAccountContextProps = {
        user: userState,
        setUser: setUserState
    };

    const notificationContextProps: INotificationContextProviderProps = {
        notifications: props.defaultNotifications
    };

    const baseUrl = getRoutePrefix(props.baseUrl);

    return (
        <ErrorBoundary>
            <AccountContextProvider value={contextProps}>
                <NotificationContextProvider value={notificationContextProps}>
                    <Main appName={props.appName} baseUrl={baseUrl} />
                </NotificationContextProvider>
            </AccountContextProvider>
        </ErrorBoundary>
    );
}
