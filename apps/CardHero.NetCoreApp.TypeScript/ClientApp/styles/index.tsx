import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faCoins, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
    faCode,
    faCoins,
    faPlus,
    faStar
);

interface IIconProps {
    icon: "code" | "coins" | "plus" | "star";
    className?: string;
}

export default function Icon(props: IIconProps) {
    return (
        <FontAwesomeIcon icon={props.icon} fixedWidth {...props} />
    );
}