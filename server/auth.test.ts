import { describe, it, expect, vi } from "vitest";
import { hashPassword, comparePasswords } from "./auth";

vi.mock("./db", () => ({
  pool: {},
  db: {}
}));

vi.mock("./storage", () => ({
  storage: {}
}));

describe("Password hashing and comparison", () => {
  it("should successfully compare correct passwords", async () => {
    const password = "mySecretPassword123!";
    const hashedPassword = await hashPassword(password);

    // Ensure the hashed password has the correct format (hash.salt)
    expect(hashedPassword).toContain(".");

    // Comparison should succeed
    const isValid = await comparePasswords(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it("should fail when comparing incorrect passwords", async () => {
    const password = "mySecretPassword123!";
    const wrongPassword = "wrongPassword456!";
    const hashedPassword = await hashPassword(password);

    // Comparison should fail
    const isValid = await comparePasswords(wrongPassword, hashedPassword);
    expect(isValid).toBe(false);
  });

  it("should generate different hashes for the same password due to salting", async () => {
    const password = "mySecretPassword123!";
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).not.toBe(hash2);

    // But both should still match the original password
    expect(await comparePasswords(password, hash1)).toBe(true);
    expect(await comparePasswords(password, hash2)).toBe(true);
  });
});
