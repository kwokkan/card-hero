import { relativeFromNow, toISOString } from "./date";

test("Current date is a few seconds ago", () => {
    const df = relativeFromNow(new Date());

    expect(df).toBe("a few seconds ago");
});

test("Date formats as ISO 8601 string", () => {
    const d = new Date(2019, 0, 2, 3, 4, 5, 6);

    const result = toISOString(d);

    expect(result).toBe("2019-01-02T03:04:05.006Z");
});