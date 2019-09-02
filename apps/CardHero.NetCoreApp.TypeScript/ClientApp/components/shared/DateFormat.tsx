import React from "react";
import { relativeFromNow } from '../../utils/date';

interface IDateFormatProps {
    date: Date;
}

export default function DateFormat(props: IDateFormatProps) {
    const d = relativeFromNow(props.date);

    return (
        <span title={props.date.toUTCString()}>{d}</span>
    );
}