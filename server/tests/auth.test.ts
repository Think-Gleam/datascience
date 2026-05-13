import { describe, it, expect, vi } from "vitest";
import { requireAdmin, requireAuth } from "../auth";

vi.mock("../db", () => ({
  pool: {},
}));

vi.mock("../storage", () => ({
  storage: {},
}));
import type { Request, Response, NextFunction } from "express";

describe("requireAuth", () => {
  it("should call next() if user is authenticated", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 401 if user is not authenticated", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(false),
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
  });
});

describe("requireAdmin", () => {
  it("should call next() if user is authenticated and is admin", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(true),
      user: { role: "admin" },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 401 if user is not authenticated", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(false),
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
  });

  it("should return 403 if user is authenticated but not admin", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(true),
      user: { role: "student" },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin access required" });
  });

  it("should return 403 if user is authenticated but role is missing", () => {
    const req = {
      isAuthenticated: vi.fn().mockReturnValue(true),
      user: {},
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin access required" });
  });
});
