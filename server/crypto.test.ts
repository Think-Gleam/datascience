import { describe, it, expect } from "vitest";
import { hashPassword, comparePasswords } from "./crypto";

describe("crypto utils", () => {
  describe("hashPassword", () => {
    it("should hash a password and return it in format hash.salt", async () => {
      const password = "mySuperSecretPassword123";
      const hashed = await hashPassword(password);

      expect(typeof hashed).toBe("string");
      expect(hashed.includes(".")).toBe(true);

      const [hash, salt] = hashed.split(".");
      expect(hash).toBeTruthy();
      expect(salt).toBeTruthy();
      expect(salt.length).toBe(32); // 16 bytes in hex is 32 chars
    });

    it("should generate different salts/hashes for the same password", async () => {
      const password = "mySuperSecretPassword123";
      const hashed1 = await hashPassword(password);
      const hashed2 = await hashPassword(password);

      expect(hashed1).not.toBe(hashed2);

      const [, salt1] = hashed1.split(".");
      const [, salt2] = hashed2.split(".");
      expect(salt1).not.toBe(salt2);
    });
  });

  describe("comparePasswords", () => {
    it("should return true for correct password", async () => {
      const password = "mySuperSecretPassword123";
      const hashed = await hashPassword(password);

      const isMatch = await comparePasswords(password, hashed);
      expect(isMatch).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const password = "mySuperSecretPassword123";
      const wrongPassword = "wrongPassword123";
      const hashed = await hashPassword(password);

      const isMatch = await comparePasswords(wrongPassword, hashed);
      expect(isMatch).toBe(false);
    });

    it("should return false for incorrect hash", async () => {
      const password = "mySuperSecretPassword123";
      const hashed = await hashPassword(password);
      const wrongHash = hashed.replace(/[a-f0-9]/, "0"); // slightly modify the hash part

      // If the replaced character happens to be 0 and we replace it with 0, it would still match.
      // So we will just manually construct a wrong hash
      const [hash, salt] = hashed.split(".");
      const modifiedHash = (hash.startsWith("a") ? "b" : "a") + hash.slice(1);
      const invalidStored = `${modifiedHash}.${salt}`;

      const isMatch = await comparePasswords(password, invalidStored);
      expect(isMatch).toBe(false);
    });

    it("should return false for incorrect salt", async () => {
      const password = "mySuperSecretPassword123";
      const hashed = await hashPassword(password);
      const [hash, salt] = hashed.split(".");
      const modifiedSalt = (salt.startsWith("a") ? "b" : "a") + salt.slice(1);
      const invalidStored = `${hash}.${modifiedSalt}`;

      const isMatch = await comparePasswords(password, invalidStored);
      expect(isMatch).toBe(false);
    });
  });
});
