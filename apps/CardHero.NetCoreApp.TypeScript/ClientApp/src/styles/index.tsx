import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBug, faCode, faCoins, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chart from 'chart.js';
import React from 'react';

// fixes some CSP issues
// https://www.chartjs.org/docs/latest/getting-started/integration.html
Chart.platform.disableCSSInjection = true;

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

interface IIconProps {
    icon: "bars" | "bug" | "code" | "coins" | "github" | "plus" | "star";
    className?: string;
}

export function Icon(props: IIconProps) {
    return (
        <FontAwesomeIcon icon={props.icon} fixedWidth {...props} />
    );
}