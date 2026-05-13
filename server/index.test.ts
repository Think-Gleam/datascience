import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// We mock the seed module to prevent it from running during tests.
// The seed module connects to the database, which causes issues when testing
// the log function.
vi.mock("./seed", () => ({
  seed: vi.fn(),
}));

import { log } from "./index";

describe("log function", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log message with default source 'express'", () => {
    log("test message");

    expect(console.log).toHaveBeenCalledTimes(1);
    const loggedMessage = vi.mocked(console.log).mock.calls[0][0];

    // Check format: "HH:MM:SS AM/PM [express] test message"
    expect(loggedMessage).toMatch(/\d{1,2}:\d{2}:\d{2}\s[AP]M \[express\] test message/);
  });

  it("should log message with custom source", () => {
    log("test message", "custom");

    expect(console.log).toHaveBeenCalledTimes(1);
    const loggedMessage = vi.mocked(console.log).mock.calls[0][0];

    // Check format: "HH:MM:SS AM/PM [custom] test message"
    expect(loggedMessage).toMatch(/\d{1,2}:\d{2}:\d{2}\s[AP]M \[custom\] test message/);
  });
});
