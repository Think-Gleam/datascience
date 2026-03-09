import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  serial,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  avatarInitials: text("avatar_initials"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  difficulty: text("difficulty").notNull(),
  specializationLevel: text("specialization_level"),
  instructorId: integer("instructor_id"),
  instructorName: text("instructor_name").notNull(),
  thumbnail: text("thumbnail"),
  duration: text("duration").notNull(),
  category: text("category").notNull(),
  gradient: text("gradient").notNull().default("from-blue-600 to-indigo-700"),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  studentCount: integer("student_count").default(0),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  orderNumber: integer("order_number").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  content: text("content"),
  duration: text("duration"),
  orderNumber: integer("order_number").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").default(0),
  status: text("status").notNull().default("active"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  certificateUrl: text("certificate_url"),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  avatarInitials: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  rating: true,
  reviewCount: true,
  studentCount: true,
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
  completedAt: true,
  progress: true,
  status: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
