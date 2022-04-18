
interface IGameBannerProps {
    visible: boolean;
    message: string;
    additionalClasses?: string;
}

export function GameBanner(props: IGameBannerProps) {
    if (!props.visible) {
        return null;
    }

    let messageClass = "game-banner-message";

    if (props.additionalClasses) {
        messageClass += " " + props.additionalClasses;
    }

    return (
        <div className="game-banner">
            <span className={messageClass}>
                {props.message}
            </span>
        </div>
    );
}
