import { nameof } from "./nameof";

interface IMockNameof {
    name: string;
}

test("nameof return correct information", () => {
    expect(nameof<IMockNameof>("name")).toBe("name");
});
