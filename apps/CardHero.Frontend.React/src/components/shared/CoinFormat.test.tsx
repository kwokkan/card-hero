import renderer from "react-test-renderer";
import { CoinFormat } from "./CoinFormat";

test("<CoinFormat /> renders all 123 gold, 45 silver, 67 bronze", () => {
    const tree = renderer
        .create(<CoinFormat coins={1234567} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test("<CoinFormat /> renders with 40 silver with others as 0", () => {
    const tree = renderer
        .create(<CoinFormat coins={4000} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});


test("<CoinFormat /> renders with 40 silver only", () => {
    const tree = renderer
        .create(<CoinFormat coins={4000} stripEmpty={true} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
