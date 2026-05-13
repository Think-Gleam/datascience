import { describe, it, expect } from "vitest";
import { hashPassword, comparePasswords } from "./auth";

describe("auth functions", () => {
  describe("hashPassword", () => {
    it("should return a string in the format hash.salt", async () => {
      const password = "mysecretpassword";
      const hashedPassword = await hashPassword(password);

      expect(typeof hashedPassword).toBe("string");

      const parts = hashedPassword.split(".");
      expect(parts.length).toBe(2);

      const [hash, salt] = parts;
      expect(hash.length).toBeGreaterThan(0);
      expect(salt.length).toBeGreaterThan(0);

      // Hexadecimal string check
      expect(/^[0-9a-f]+$/i.test(hash)).toBe(true);
      expect(/^[0-9a-f]+$/i.test(salt)).toBe(true);
    });

    it("should generate different hashes/salts for the same password", async () => {
      const password = "mysecretpassword";
      const hashedPassword1 = await hashPassword(password);
      const hashedPassword2 = await hashPassword(password);

      expect(hashedPassword1).not.toBe(hashedPassword2);

      const salt1 = hashedPassword1.split(".")[1];
      const salt2 = hashedPassword2.split(".")[1];
      expect(salt1).not.toBe(salt2);
    });
  });

  describe("comparePasswords", () => {
    it("should return true for a correct password", async () => {
      const password = "mysecretpassword";
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePasswords(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should return false for an incorrect password", async () => {
      const password = "mysecretpassword";
      const wrongPassword = "wrongpassword";
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePasswords(wrongPassword, hashedPassword);
      expect(isMatch).toBe(false);
    });
  });
});
