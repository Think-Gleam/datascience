import { describe, it, expect } from "vitest";
import { hashPassword, comparePasswords } from "./crypto.ts";

describe("crypto utils", () => {
  describe("hashPassword", () => {
    it("should return a string in the format hash.salt", async () => {
      const password = "mysecretpassword";
      const hashed = await hashPassword(password);

      expect(typeof hashed).toBe("string");
      const parts = hashed.split(".");
      expect(parts.length).toBe(2);
      expect(parts[0]).toBeDefined(); // hash
      expect(parts[1]).toBeDefined(); // salt
      expect(parts[1].length).toBe(32); // 16 bytes hex = 32 chars
    });

    it("should generate different salts/hashes for the same password", async () => {
      const password = "mysecretpassword";
      const hashed1 = await hashPassword(password);
      const hashed2 = await hashPassword(password);

      expect(hashed1).not.toBe(hashed2);
    });
  });

  describe("comparePasswords", () => {
    it("should return true for a matching password", async () => {
      const password = "mysecretpassword";
      const hashed = await hashPassword(password);

      const isValid = await comparePasswords(password, hashed);
      expect(isValid).toBe(true);
    });

    it("should return false for a non-matching password", async () => {
      const password = "mysecretpassword";
      const wrongPassword = "wrongpassword";
      const hashed = await hashPassword(password);

      const isValid = await comparePasswords(wrongPassword, hashed);
      expect(isValid).toBe(false);
    });
  });
});
