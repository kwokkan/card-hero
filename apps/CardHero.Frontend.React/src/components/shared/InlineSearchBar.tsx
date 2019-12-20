import React, { useState, useEffect } from "react";

interface IInlineSearchBarProps {
    value?: string;
    onValueUpdated?: (value?: string) => void;
}

export function InlineSearchBar(props: IInlineSearchBarProps) {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        onValueUpdated();
    }, [value]);

    const onValueUpdated = () => {
        if (props.onValueUpdated) {
            props.onValueUpdated(value);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setValue(event.currentTarget.value);
        }
    };

    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" value={props.value} onChange={onChange} onKeyUp={onKeyUp} />
            <div className="input-group-append">
                <button type="button" className="btn btn-primary" onClick={onValueUpdated}>Search</button>
            </div>
        </div>
    );
}
