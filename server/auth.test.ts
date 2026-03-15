import { describe, it, expect, vi } from "vitest";
import { requireAuth, requireAdmin } from "./auth";

describe("Auth Middleware", () => {
  describe("requireAuth", () => {
    it("should return 401 if user is not authenticated", () => {
      const req = {
        isAuthenticated: vi.fn().mockReturnValue(false),
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      requireAuth(req, res, next);

      expect(req.isAuthenticated).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next if user is authenticated", () => {
      const req = {
        isAuthenticated: vi.fn().mockReturnValue(true),
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      requireAuth(req, res, next);

      expect(req.isAuthenticated).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("requireAdmin", () => {
    it("should return 401 if user is not authenticated", () => {
      const req = {
        isAuthenticated: vi.fn().mockReturnValue(false),
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      requireAdmin(req, res, next);

      expect(req.isAuthenticated).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if user is authenticated but not an admin", () => {
      const req = {
        isAuthenticated: vi.fn().mockReturnValue(true),
        user: { role: "student" },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      requireAdmin(req, res, next);

      expect(req.isAuthenticated).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Admin access required" });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next if user is authenticated and is an admin", () => {
      const req = {
        isAuthenticated: vi.fn().mockReturnValue(true),
        user: { role: "admin" },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      requireAdmin(req, res, next);

      expect(req.isAuthenticated).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
