import { relativeFromNow } from "./date";

test("Current date is a few seconds ago", () => {
    const df = relativeFromNow(new Date());

    expect(df).toBe("a few seconds ago");
});
