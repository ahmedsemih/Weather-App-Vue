import { describe, expect, it } from "vitest";

import capitalize from "./capitalize";

describe("capitalize function", () => {
  it("should capitalize the first letter of words", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("hello world")).toBe("Hello World");
    expect(capitalize("heLLo WoRlD")).toBe("Hello World");
  });
});
