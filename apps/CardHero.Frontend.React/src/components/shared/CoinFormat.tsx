import { Icon } from "../../styles/index";

interface ICoinFormatProps {
    coins: number;
    title?: string;
    stripEmpty?: boolean;
}

const coinRender = (className: string, value: number, stripEmpty: boolean): JSX.Element => {
    const shouldStrip = stripEmpty && value === 0;

    if (shouldStrip) {
        return null;
    }

    return (
        <span className="coin-group">
            <Icon icon="coins" className={className} />
            {' '}
            {value}
        </span>
    );
};

export function CoinFormat(props: ICoinFormatProps) {
    if (props.coins < 0) return null;

    const c = props.coins;
    const gold = Math.floor(c / 10000);
    const silver = Math.floor(c / 100) % 100;
    const bronze = c % 100;

    const se = props.stripEmpty === true;

    return (
        <span title={props.title}>
            {coinRender("coin-gold", gold, se)}

            {coinRender("coin-silver", silver, se)}

            {coinRender("coin-bronze", bronze, se)}
        </span>
    );
}