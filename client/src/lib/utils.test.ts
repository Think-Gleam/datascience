import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("should merge basic string classes", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should merge tailwind classes and resolve conflicts", () => {
    // twMerge should override px-2 with p-3
    expect(cn("px-2 py-1", "p-3")).toBe("p-3");
    // bg-red-500 should be overridden by bg-blue-500
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("should conditionally apply classes with clsx", () => {
    expect(
      cn({
        "bg-red-500": true,
        "bg-blue-500": false,
        "text-white": true,
      })
    ).toBe("bg-red-500 text-white");

    expect(cn("base-class", { "active-class": true, "inactive-class": false })).toBe(
      "base-class active-class"
    );
  });

  it("should handle arrays of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });

  it("should ignore undefined, null, and false values", () => {
    expect(cn("class1", undefined, "class2", null, false, "class3")).toBe(
      "class1 class2 class3"
    );
  });

  it("should handle mixed inputs (arrays, objects, strings)", () => {
    expect(
      cn(
        "class1",
        ["class2", "class3"],
        { "class4": true, "class5": false },
        "px-4 py-2 p-1"
      )
    ).toBe("class1 class2 class3 class4 p-1");
  });
});
