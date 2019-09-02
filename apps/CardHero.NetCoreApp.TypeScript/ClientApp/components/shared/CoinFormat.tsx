import React from "react";
import Icon from "../../styles/index";

interface ICoinFormatProps {
    coins: number;
    title?: string;
    stripEmpty?: boolean;
}

export default function CoinFormat(props: ICoinFormatProps) {
    if (props.coins < 0) return null;

    const c = props.coins;
    const gold = Math.floor(c / 10000);
    const silver = Math.floor(c / 100) % 100;
    const bronze = c % 100;

    // React bug still outputs if true
    const se = !!props.stripEmpty;

    return (
        <span title={props.title}>
            {(!se || (se && gold)) &&
                <span className="coin-group">
                    <Icon icon="coins" className="coin-gold" />
                    {' '}
                    {gold}
                </span>
            }

            {(!se || (se && silver)) &&
                <span className="coin-group">
                    <Icon icon="coins" className="coin-silver" />
                    {' '}
                    {silver}
                </span>
            }

            {(!se || (se && bronze)) &&
                <span className="coin-group">
                    <Icon icon="coins" className="coin-bronze" />
                    {' '}
                    {bronze}
                </span>
            }
        </span>
    );
}