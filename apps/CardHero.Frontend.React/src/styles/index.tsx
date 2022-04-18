import { config, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBug, faCode, faCoins, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// https://fontawesome.com/how-to-use/on-the-web/other-topics/security
config.autoAddCss = false;

// redefine prefixes so that the Icon function is easier to use
faGithub.prefix = "fas";

library.add(
    faBars,
    faBug,
    faCode,
    faCoins,
    faGithub,
    faPlus,
    faStar
);

type IconType = Extract<IconName, "bars" | "bug" | "code" | "coins" | "github" | "plus" | "star">;

interface IIconProps {
    icon: IconType;
    className?: string;
}

export function Icon(props: IIconProps) {
    return (
        <FontAwesomeIcon icon={props.icon} fixedWidth {...props} />
    );
}
