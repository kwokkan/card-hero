import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBug, faCode, faCoins, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// redefine prefixes so that the Icon function is easier to use
faGithub.prefix = "fas";

library.add(
    faBug,
    faCode,
    faCoins,
    faGithub,
    faPlus,
    faStar
);

interface IIconProps {
    icon: "bug" | "code" | "coins" | "github" | "plus" | "star";
    className?: string;
}

export default function Icon(props: IIconProps) {
    return (
        <FontAwesomeIcon icon={props.icon} fixedWidth {...props} />
    );
}