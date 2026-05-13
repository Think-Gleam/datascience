import { describe, it, expect, vi } from "vitest";
import { hashPassword, comparePasswords } from "./auth";

// Mock dependencies to prevent initialization errors and immediate database connections
vi.mock("./db", () => ({ pool: {} }));
vi.mock("./storage", () => ({ storage: {} }));

describe("Auth Module", () => {
  describe("hashPassword and comparePasswords", () => {
    it("should hash a password and verify it correctly", async () => {
      const password = "mySuperSecretPassword123";
      const hashedPassword = await hashPassword(password);

      // Expected format: hexString.hexString
      expect(hashedPassword).toContain(".");
      const [hash, salt] = hashedPassword.split(".");
      expect(hash).toBeDefined();
      expect(salt).toBeDefined();

      // Verify matches
      const isMatch = await comparePasswords(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should return false for incorrect passwords", async () => {
      const password = "mySuperSecretPassword123";
      const hashedPassword = await hashPassword(password);

      // Verify mismatch
      const isMatch = await comparePasswords("wrongPassword", hashedPassword);
      expect(isMatch).toBe(false);
    });

    it("should handle empty string passwords correctly", async () => {
      const password = "";
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePasswords("", hashedPassword);
      expect(isMatch).toBe(true);

      const isMismatch = await comparePasswords("notEmpty", hashedPassword);
      expect(isMismatch).toBe(false);
    });

    it("should fail validation if incorrect hash format is provided", async () => {
      const supplied = "somePassword";
      const stored = "invalidHashFormatWithoutDot";

      // comparePasswords relies on `stored.split(".")`, so this might result in undefined salt
      await expect(comparePasswords(supplied, stored)).rejects.toThrow();
    });
  });
});
