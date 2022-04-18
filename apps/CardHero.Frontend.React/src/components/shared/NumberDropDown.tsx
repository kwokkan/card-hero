import { SelectHTMLAttributes } from "react";

type INumberDropDownProps = Pick<SelectHTMLAttributes<HTMLSelectElement>, "name" | "onChange" | "value">;

export function NumberDropDown(props: INumberDropDownProps) {
    return (
        <select name={props.name} className="form-control" value={props.value} onChange={props.onChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    );
}
