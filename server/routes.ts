import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, requireAuth, requireAdmin } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get("/api/courses", async (_req, res, next) => {
    try {
      const publishedOnly = !_req.isAuthenticated() || _req.user?.role !== "admin";
      const courseList = await storage.getCourses(publishedOnly);
      res.json(courseList);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/courses/:id", async (req, res, next) => {
    try {
      const courseId = Number(req.params.id);
      if (isNaN(courseId)) return res.status(400).json({ message: "Invalid course ID" });
      const course = await storage.getCourse(courseId);
      if (!course) return res.status(404).json({ message: "Course not found" });
      if (!course.published && (!req.isAuthenticated() || req.user?.role !== "admin")) {
        return res.status(404).json({ message: "Course not found" });
      }
      const courseModules = await storage.getModules(course.id);
      const allLessons = await storage.getLessonsByCourse(course.id);

      const modulesWithLessons = courseModules.map((mod) => {
        const modLessons = allLessons.filter(lesson => lesson.moduleId === mod.id);
        return { ...mod, lessons: modLessons };
      });

      res.json({ ...course, modules: modulesWithLessons });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/courses", requireAdmin, async (req, res, next) => {
    try {
      const course = await storage.createCourse(req.body);
      res.status(201).json(course);
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/courses/:id", requireAdmin, async (req, res, next) => {
    try {
      const course = await storage.updateCourse(Number(req.params.id), req.body);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(course);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/courses/:id", requireAdmin, async (req, res, next) => {
    try {
      await storage.deleteCourse(Number(req.params.id));
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/courses/:id/modules", requireAdmin, async (req, res, next) => {
    try {
      const mod = await storage.createModule({
        courseId: Number(req.params.id),
        ...req.body,
      });
      res.status(201).json(mod);
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/modules/:id", requireAdmin, async (req, res, next) => {
    try {
      const mod = await storage.updateModule(Number(req.params.id), req.body);
      if (!mod) return res.status(404).json({ message: "Module not found" });
      res.json(mod);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/modules/:id", requireAdmin, async (req, res, next) => {
    try {
      await storage.deleteModule(Number(req.params.id));
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/modules/:id/lessons", requireAdmin, async (req, res, next) => {
    try {
      const lesson = await storage.createLesson({
        moduleId: Number(req.params.id),
        ...req.body,
      });
      res.status(201).json(lesson);
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/lessons/:id", requireAdmin, async (req, res, next) => {
    try {
      const lesson = await storage.updateLesson(Number(req.params.id), req.body);
      if (!lesson) return res.status(404).json({ message: "Lesson not found" });
      res.json(lesson);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/lessons/:id", requireAdmin, async (req, res, next) => {
    try {
      await storage.deleteLesson(Number(req.params.id));
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/enrollments", requireAuth, async (req, res, next) => {
    try {
      const userEnrollments = await storage.getEnrollments(req.user!.id);
      res.json(userEnrollments);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/enrollments", requireAuth, async (req, res, next) => {
    try {
      const { courseId } = req.body;
      const existing = await storage.getEnrollment(req.user!.id, courseId);
      if (existing) return res.status(400).json({ message: "Already enrolled" });
      const enrollment = await storage.createEnrollment({
        userId: req.user!.id,
        courseId,
      });
      res.status(201).json(enrollment);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/enrollments/:courseId/progress", requireAuth, async (req, res, next) => {
    try {
      const courseId = Number(req.params.courseId);
      const enrollment = await storage.getEnrollment(req.user!.id, courseId);
      if (!enrollment) return res.status(404).json({ message: "Not enrolled" });

      const totalLessons = await storage.getLessonsByCourse(courseId);
      const completedLessons = await storage.getLessonProgressByCourse(req.user!.id, courseId);
      const completedCount = completedLessons.filter((l) => l.completed).length;

      res.json({
        enrollment,
        totalLessons: totalLessons.length,
        completedLessons: completedCount,
        percentage: totalLessons.length > 0 ? Math.round((completedCount / totalLessons.length) * 100) : 0,
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/lessons/:id/complete", requireAuth, async (req, res, next) => {
    try {
      const lessonId = Number(req.params.id);
      if (isNaN(lessonId)) return res.status(400).json({ message: "Invalid lesson ID" });

      const mod = await db_getModuleByLesson(lessonId);
      if (!mod) return res.status(404).json({ message: "Lesson not found" });

      const enrollment = await storage.getEnrollment(req.user!.id, mod.courseId);
      if (!enrollment) return res.status(403).json({ message: "Not enrolled in this course" });

      const progress = await storage.markLessonComplete(req.user!.id, lessonId);

      const totalLessons = await storage.getLessonsByCourse(mod.courseId);
      const completedLessons = await storage.getLessonProgressByCourse(req.user!.id, mod.courseId);
      const completedCount = completedLessons.filter((l) => l.completed).length;
      const percentage = totalLessons.length > 0 ? Math.round((completedCount / totalLessons.length) * 100) : 0;

      await storage.updateEnrollmentProgress(enrollment.id, percentage);
      if (percentage >= 100 && enrollment.status !== "completed") {
        await storage.completeEnrollment(enrollment.id);
        const existingCerts = await storage.getCertificates(req.user!.id);
        if (!existingCerts.some((c) => c.courseId === mod.courseId)) {
          await storage.createCertificate(req.user!.id, mod.courseId);
        }
      }

      res.json(progress);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/enrollments/:courseId/lesson-progress", requireAuth, async (req, res, next) => {
    try {
      const courseId = Number(req.params.courseId);
      if (isNaN(courseId)) return res.status(400).json({ message: "Invalid course ID" });
      const enrollment = await storage.getEnrollment(req.user!.id, courseId);
      if (!enrollment) return res.status(404).json({ message: "Not enrolled" });
      const progress = await storage.getLessonProgressByCourse(req.user!.id, courseId);
      res.json(progress);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/certificates", requireAuth, async (req, res, next) => {
    try {
      const certs = await storage.getCertificates(req.user!.id);
      res.json(certs);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res, next) => {
    try {
      const [userCount, courseCount, enrollmentCount, certificateCount] = await Promise.all([
        storage.getUserCount(),
        storage.getCourseCount(),
        storage.getEnrollmentCount(),
        storage.getCertificateCount(),
      ]);
      res.json({ userCount, courseCount, enrollmentCount, certificateCount });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/admin/users", requireAdmin, async (req, res, next) => {
    try {
      const allUsers = await storage.getAllUsers();
      res.json(allUsers.map(({ password, ...u }) => u));
    } catch (err) {
      next(err);
    }
  });

  return httpServer;
}

import { db } from "./db";
import { modules } from "@shared/schema";
import { eq } from "drizzle-orm";

async function db_getModuleByLesson(lessonId: number) {
  const { lessons } = await import("@shared/schema");
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
  if (!lesson) return null;
  const [mod] = await db.select().from(modules).where(eq(modules.id, lesson.moduleId));
  return mod || null;
}
