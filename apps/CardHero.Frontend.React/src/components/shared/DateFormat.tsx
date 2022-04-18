import { relativeFromNow, toISOString } from '../../utils/date';

interface IDateFormatProps {
    date: Date;
}

export function DateFormat(props: IDateFormatProps) {
    const d = relativeFromNow(props.date);

    return (
        <time title={props.date.toUTCString()} dateTime={toISOString(props.date)}>{d}</time>
    );
}
