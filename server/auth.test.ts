import { describe, it, expect, vi } from 'vitest';

// Mock dependencies to prevent database connection errors during isolated tests
vi.mock('./db', () => ({
  pool: {},
  db: {}
}));
vi.mock('./storage', () => ({
  storage: {}
}));

import { hashPassword, comparePasswords } from './auth';

describe('Authentication Functions', () => {
  describe('hashPassword', () => {
    it('should generate a hash with the correct format', async () => {
      const password = 'mySuperSecretPassword123';
      const hashedPassword = await hashPassword(password);

      // The format should be "hash.salt"
      const parts = hashedPassword.split('.');
      expect(parts.length).toBe(2);

      const [hash, salt] = parts;

      // Hash and salt should be valid hex strings
      expect(hash).toMatch(/^[0-9a-f]+$/i);
      expect(salt).toMatch(/^[0-9a-f]+$/i);

      // Salt length should be 32 characters (16 bytes hex encoded)
      expect(salt.length).toBe(32);

      // Hash length should be 128 characters (64 bytes hex encoded)
      expect(hash.length).toBe(128);
    });

    it('should generate different hashes/salts for the same password', async () => {
      const password = 'mySuperSecretPassword123';

      const hashedPassword1 = await hashPassword(password);
      const hashedPassword2 = await hashPassword(password);

      expect(hashedPassword1).not.toBe(hashedPassword2);

      const [, salt1] = hashedPassword1.split('.');
      const [, salt2] = hashedPassword2.split('.');

      expect(salt1).not.toBe(salt2);
    });
  });

  describe('comparePasswords', () => {
    it('should return true for a correctly matching password and hash', async () => {
      const password = 'mySuperSecretPassword123';
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePasswords(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
      const password = 'mySuperSecretPassword123';
      const wrongPassword = 'mySuperSecretPassword124';
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePasswords(wrongPassword, hashedPassword);
      expect(isMatch).toBe(false);
    });
  });
});
