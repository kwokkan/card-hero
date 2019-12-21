import React, { useCallback, useEffect, useState } from "react";

interface IInlineSearchBarProps {
    value?: string;
    onValueUpdated?: (value?: string) => void;
}

export function InlineSearchBar({ value, onValueUpdated }: IInlineSearchBarProps) {
    const [_value, _setValue] = useState(value || "");

    const _onValueUpdated = useCallback(() => {
        if (onValueUpdated) {
            onValueUpdated(_value);
        }
    }, [_value, onValueUpdated]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        _setValue(event.currentTarget.value);
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            _setValue(event.currentTarget.value);
        }
    };

    useEffect(() => {
        _onValueUpdated();
    }, [_onValueUpdated]);

    return (
        <div className="input-group">
            <input type="search" className="form-control" placeholder="Search" value={_value} onChange={onChange} onKeyUp={onKeyUp} />
            <div className="input-group-append">
                <button type="button" className="btn btn-primary" onClick={_onValueUpdated}>Search</button>
            </div>
        </div>
    );
}
