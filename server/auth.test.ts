import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

// Need to mock passport to avoid req.login trying to do things with sessions that fail
vi.mock("passport", () => {
  return {
    default: {
      initialize: () => (req: any, res: any, next: any) => next(),
      session: () => (req: any, res: any, next: any) => next(),
      use: vi.fn(),
      serializeUser: vi.fn(),
      deserializeUser: vi.fn(),
      authenticate:
        (strategy: string, cb: any) => (req: any, res: any, next: any) => {
          // Simple mock for local auth that just calls the callback with what we put in req
          if (
            req.body.email === "test@example.com" &&
            req.body.password === "password123"
          ) {
            const user = {
              id: 1,
              name: "Test User",
              email: "test@example.com",
              password: "hashed",
            };
            cb(null, user, null);
          } else {
            cb(null, false, { message: "Invalid email or password" });
          }
        },
    },
  };
});

// Complete mock for connect-pg-simple to avoid db connection errors
vi.mock("connect-pg-simple", () => {
  return {
    default: () => {
      return class MockPgSession {
        constructor() {}
        get = vi.fn((sid, cb) => cb(null, null));
        set = vi.fn((sid, session, cb) => cb(null));
        destroy = vi.fn((sid, cb) => cb(null));
        on = vi.fn(); // Need to mock event emitter methods
      };
    },
  };
});

// Mock the db file entirely to avoid the DATABASE_URL error
vi.mock("./db", () => ({
  pool: {},
}));

// Provide a mock directly inside the vi.mock factory to avoid the initialization error
vi.mock("./storage", () => ({
  storage: {
    getUserByEmail: vi.fn(),
    getUser: vi.fn(),
    createUser: vi.fn(),
  },
}));

import { setupAuth, requireAuth, requireAdmin } from "./auth";
import { storage } from "./storage";

describe("Authentication Routes", () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());

    // Set a dummy SESSION_SECRET so setupAuth doesn't throw if it validates it
    process.env.SESSION_SECRET = "test-secret";

    // We also need to mock req.login, req.logout, and req.isAuthenticated that passport adds
    app.use((req: any, res: any, next: any) => {
      req.login = vi.fn((user, cb) => cb());
      req.logout = vi.fn((cb) => cb());
      // Default to false for these tests unless overridden
      if (!req.isAuthenticated) {
        req.isAuthenticated = vi.fn(() => false);
      }
      next();
    });

    setupAuth(app);
    // Add mock routes for testing middleware
    app.get("/test/protected", requireAuth, (req, res) =>
      res.json({ ok: true }),
    );
    app.get("/test/admin", requireAdmin, (req, res) => res.json({ ok: true }));

    // Error handler
    app.use((err: any, req: any, res: any, next: any) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
  });

  describe("POST /api/auth/register", () => {
    it("should return 400 if missing fields", async () => {
      const res = await request(app).post("/api/auth/register").send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Name, email, and password are required");
    });

    it("should return 400 if password is too short", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "123",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Password must be at least 6 characters");
    });

    it("should return 400 if email is already registered", async () => {
      vi.mocked(storage.getUserByEmail).mockResolvedValue({
        id: 1,
        email: "test@example.com",
      } as any);
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email already registered");
    });

    it("should successfully register a new user", async () => {
      vi.mocked(storage.getUserByEmail).mockResolvedValue(undefined);
      vi.mocked(storage.createUser).mockResolvedValue({
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "student",
        password: "hashedpassword",
        avatarInitials: null,
        createdAt: new Date(),
      });

      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(1);
      expect(res.body.name).toBe("Test User");
      expect(res.body.email).toBe("test@example.com");
      expect(res.body.password).toBeUndefined(); // Should not return password
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return 401 for invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "wrong@example.com", password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });

    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.email).toBe("test@example.com");
      expect(res.body.password).toBeUndefined();
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout successfully", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Logged out");
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return 401 if not authenticated", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Not authenticated");
    });

    it("should return user data if authenticated", async () => {
      const testApp = express();
      testApp.use((req: any, res, next) => {
        req.isAuthenticated = () => true;
        req.user = { id: 1, name: "Test User" };
        next();
      });
      setupAuth(testApp);

      const res = await request(testApp).get("/api/auth/me");
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(res.body.name).toBe("Test User");
    });
  });

  describe("Middleware", () => {
    describe("requireAuth", () => {
      it("should return 401 if not authenticated", async () => {
        const res = await request(app).get("/test/protected");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Authentication required");
      });
    });

    describe("requireAdmin", () => {
      it("should return 401 if not authenticated", async () => {
        const res = await request(app).get("/test/admin");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Authentication required");
      });

      it("should return 403 if authenticated but not admin", async () => {
        // Create an app that fakes an authenticated student user
        const testApp = express();
        testApp.use((req: any, res, next) => {
          req.isAuthenticated = () => true;
          req.user = { id: 1, role: "student" };
          next();
        });
        testApp.get("/test/admin", requireAdmin, (req, res) =>
          res.json({ ok: true }),
        );

        const res = await request(testApp).get("/test/admin");
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Admin access required");
      });

      it("should proceed if authenticated and admin", async () => {
        // Create an app that fakes an authenticated admin user
        const testApp = express();
        testApp.use((req: any, res, next) => {
          req.isAuthenticated = () => true;
          req.user = { id: 1, role: "admin" };
          next();
        });
        testApp.get("/test/admin", requireAdmin, (req, res) =>
          res.json({ ok: true }),
        );

        const res = await request(testApp).get("/test/admin");
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
      });
    });
  });
});
