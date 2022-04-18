import MockDate from "mockdate";
import renderer from "react-test-renderer";
import { DateFormat } from "./DateFormat";

const mockDate = new Date(2019, 0, 2, 3, 4, 5, 6);

beforeEach(() => {
    MockDate.set(mockDate);
});

afterEach(() => {
    MockDate.reset();
});

test("<DateFormat /> renders correctly", () => {
    const tree = renderer
        .create(<DateFormat date={mockDate} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
