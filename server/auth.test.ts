import { describe, it, expect, vi } from "vitest";
import { requireAuth } from "./auth";

describe("requireAuth middleware", () => {
  it("should call next() if user is authenticated", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    requireAuth(req as any, res as any, next);

    expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 401 and authentication required message if user is not authenticated", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(false),
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    requireAuth(req as any, res as any, next);

    expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
    expect(next).not.toHaveBeenCalled();
  });
});
