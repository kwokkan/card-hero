import { Chart, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { createRoot } from "react-dom/client";
import { CardHeroApiClientBase } from "../clients/CardHeroApiClientBase";
import { AppBootstrap } from "../components/shared/AppBootstrap";
import { INotificationItem } from "../types/INotificationItem";
import { NotificationType } from "../types/NotificationType";
import { MainApp } from "./MainApp";

Chart.register(
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale
);

CardHeroApiClientBase.baseUrl = AppBootstrap.baseUrl;

const appName = Constants.AppName;

const defaultNotifications: INotificationItem[] = [
    {
        message: "Game will be having maintenance.",
        title: "Status update",
        type: NotificationType.Info
    }
];

const root = createRoot(AppBootstrap.rootElement);

root.render(
    <MainApp appName={appName} defaultNotifications={defaultNotifications} />
);
