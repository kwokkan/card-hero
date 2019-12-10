import { getRoutePrefix } from "./route";

test("Empty route returns /", () => {
    const prefix = getRoutePrefix();

    expect(prefix).toBe("/");
});

test("null route returns /", () => {
    const prefix = getRoutePrefix(null);

    expect(prefix).toBe("/");
});

test("Prefix with trailing / returns same path", () => {
    const prefix = getRoutePrefix("test/");

    expect(prefix).toBe("test/");
});

test("Prefix without trailing / returns same path with /", () => {
    const prefix = getRoutePrefix("test");

    expect(prefix).toBe("test/");
});
