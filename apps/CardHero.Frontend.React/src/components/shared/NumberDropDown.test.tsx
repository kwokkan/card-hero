import renderer from "react-test-renderer";
import { NumberDropDown } from "./NumberDropDown";

test("<NumberDropDown /> renders with no props", () => {
    const tree = renderer
        .create(
            <NumberDropDown />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NumberDropDown /> renders with number value", () => {
    const tree = renderer
        .create(
            <NumberDropDown value={12} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NumberDropDown /> renders with string value", () => {
    const tree = renderer
        .create(
            <NumberDropDown value="hello" />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<NumberDropDown /> renders with onChange", () => {
    const onChangeFunc = () => {
    };
    const tree = renderer
        .create(
            <NumberDropDown onChange={onChangeFunc} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
