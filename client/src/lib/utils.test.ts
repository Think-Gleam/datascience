import test from "node:test";
import assert from "node:assert";
import { cn } from "./utils.ts";

test("cn utility", async (t) => {
  await t.test("merges basic class names", () => {
    assert.strictEqual(cn("class-a", "class-b"), "class-a class-b");
  });

  await t.test("resolves tailwind conflicts", () => {
    // twMerge will resolve p-2 and p-4 (they conflict), and keep the latter
    assert.strictEqual(cn("p-2", "p-4"), "p-4");
  });

  await t.test("handles conditional class names", () => {
    // clsx handles falsy values correctly
    assert.strictEqual(cn("p-2", false, null, undefined, 0, "m-4"), "p-2 m-4");
  });

  await t.test("handles arrays of class names", () => {
    assert.strictEqual(cn(["p-2", "m-4"], ["flex", "justify-center"]), "p-2 m-4 flex justify-center");
  });

  await t.test("handles object class names", () => {
    assert.strictEqual(cn({ "p-2": true, "m-4": false, "flex": true }), "p-2 flex");
  });

  await t.test("complex combinations", () => {
    assert.strictEqual(
      cn("base-class", ["array-class", { "obj-class": true }], false, null, "p-2 p-4"),
      "base-class array-class obj-class p-4"
    );
  });
});
