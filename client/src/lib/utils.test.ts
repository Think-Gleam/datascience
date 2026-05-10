import test from "node:test";
import assert from "node:assert";
import { cn } from "./utils.ts";

test("cn utility", async (t) => {
  await t.test("merges simple class names", () => {
    assert.strictEqual(cn("class1", "class2"), "class1 class2");
  });

  await t.test("handles conditional classes", () => {
    assert.strictEqual(
      cn("base-class", { "active-class": true, "inactive-class": false }),
      "base-class active-class",
    );
  });

  await t.test("resolves tailwind conflicts correctly", () => {
    assert.strictEqual(cn("px-2", "p-4"), "p-4");
    assert.strictEqual(cn("text-red-500", "text-blue-500"), "text-blue-500");
    assert.strictEqual(
      cn("bg-red-500", "bg-blue-500", "bg-green-500"),
      "bg-green-500",
    );
  });

  await t.test("handles falsy values gracefully", () => {
    assert.strictEqual(
      cn("base-class", undefined, null, false, "", "another-class"),
      "base-class another-class",
    );
  });

  await t.test("handles arrays of classes", () => {
    assert.strictEqual(
      cn(["class1", "class2"], "class3"),
      "class1 class2 class3",
    );
  });

  await t.test("handles nested arrays of classes", () => {
    assert.strictEqual(
      cn(["class1", ["class2", "class3"]], "class4"),
      "class1 class2 class3 class4",
    );
  });
});
