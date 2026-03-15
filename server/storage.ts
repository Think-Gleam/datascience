import {
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Module,
  type InsertModule,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type LessonProgress,
  type Certificate,
  users,
  courses,
  modules,
  lessons,
  enrollments,
  lessonProgress,
  certificates,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, asc, desc, sql, count, inArray } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserCount(): Promise<number>;

  getCourses(publishedOnly?: boolean): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(
    id: number,
    data: Partial<InsertCourse>,
  ): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<void>;
  getCourseCount(): Promise<number>;

  getModules(courseId: number): Promise<Module[]>;
  createModule(mod: InsertModule): Promise<Module>;
  updateModule(
    id: number,
    data: Partial<InsertModule>,
  ): Promise<Module | undefined>;
  deleteModule(id: number): Promise<void>;

  getLessons(moduleId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(
    id: number,
    data: Partial<InsertLesson>,
  ): Promise<Lesson | undefined>;
  deleteLesson(id: number): Promise<void>;

  getEnrollments(userId: number): Promise<(Enrollment & { course: Course })[]>;
  getEnrollment(
    userId: number,
    courseId: number,
  ): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: number, progress: number): Promise<void>;
  completeEnrollment(id: number): Promise<void>;
  getEnrollmentCount(): Promise<number>;

  getLessonProgress(
    userId: number,
    lessonId: number,
  ): Promise<LessonProgress | undefined>;
  getLessonProgressByCourse(
    userId: number,
    courseId: number,
  ): Promise<LessonProgress[]>;
  markLessonComplete(userId: number, lessonId: number): Promise<LessonProgress>;

  getCertificates(
    userId: number,
  ): Promise<(Certificate & { course: Course })[]>;
  createCertificate(userId: number, courseId: number): Promise<Certificate>;
  getCertificateCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const initials = insertUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, avatarInitials: initials })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getUserCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(users);
    return result.count;
  }

  async getCourses(publishedOnly = false): Promise<Course[]> {
    if (publishedOnly) {
      return db
        .select()
        .from(courses)
        .where(eq(courses.published, true))
        .orderBy(asc(courses.id));
    }
    return db.select().from(courses).orderBy(asc(courses.id));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [created] = await db.insert(courses).values(course).returning();
    return created;
  }

  async updateCourse(
    id: number,
    data: Partial<InsertCourse>,
  ): Promise<Course | undefined> {
    const [updated] = await db
      .update(courses)
      .set(data)
      .where(eq(courses.id, id))
      .returning();
    return updated;
  }

  async deleteCourse(id: number): Promise<void> {
    await db.delete(courses).where(eq(courses.id, id));
  }

  async getCourseCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(courses);
    return result.count;
  }

  async getModules(courseId: number): Promise<Module[]> {
    return db
      .select()
      .from(modules)
      .where(eq(modules.courseId, courseId))
      .orderBy(asc(modules.orderNumber));
  }

  async createModule(mod: InsertModule): Promise<Module> {
    const [created] = await db.insert(modules).values(mod).returning();
    return created;
  }

  async updateModule(
    id: number,
    data: Partial<InsertModule>,
  ): Promise<Module | undefined> {
    const [updated] = await db
      .update(modules)
      .set(data)
      .where(eq(modules.id, id))
      .returning();
    return updated;
  }

  async deleteModule(id: number): Promise<void> {
    await db.delete(lessons).where(eq(lessons.moduleId, id));
    await db.delete(modules).where(eq(modules.id, id));
  }

  async getLessons(moduleId: number): Promise<Lesson[]> {
    return db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId))
      .orderBy(asc(lessons.orderNumber));
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    const mods = await this.getModules(courseId);
    const allLessons: Lesson[] = [];
    for (const mod of mods) {
      const modLessons = await this.getLessons(mod.id);
      allLessons.push(...modLessons);
    }
    return allLessons;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [created] = await db.insert(lessons).values(lesson).returning();
    return created;
  }

  async updateLesson(
    id: number,
    data: Partial<InsertLesson>,
  ): Promise<Lesson | undefined> {
    const [updated] = await db
      .update(lessons)
      .set(data)
      .where(eq(lessons.id, id))
      .returning();
    return updated;
  }

  async deleteLesson(id: number): Promise<void> {
    await db.delete(lessons).where(eq(lessons.id, id));
  }

  async getEnrollments(
    userId: number,
  ): Promise<(Enrollment & { course: Course })[]> {
    const rows = await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));

    return rows.map((r) => ({ ...r.enrollments, course: r.courses }));
  }

  async getEnrollment(
    userId: number,
    courseId: number,
  ): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(
        and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)),
      );
    return enrollment;
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [created] = await db
      .insert(enrollments)
      .values(enrollment)
      .returning();
    await db
      .update(courses)
      .set({ studentCount: sql`${courses.studentCount} + 1` })
      .where(eq(courses.id, enrollment.courseId));
    return created;
  }

  async updateEnrollmentProgress(id: number, progress: number): Promise<void> {
    await db
      .update(enrollments)
      .set({ progress })
      .where(eq(enrollments.id, id));
  }

  async completeEnrollment(id: number): Promise<void> {
    await db
      .update(enrollments)
      .set({ progress: 100, status: "completed", completedAt: new Date() })
      .where(eq(enrollments.id, id));
  }

  async getEnrollmentCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(enrollments);
    return result.count;
  }

  async getLessonProgress(
    userId: number,
    lessonId: number,
  ): Promise<LessonProgress | undefined> {
    const [progress] = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.lessonId, lessonId),
        ),
      );
    return progress;
  }

  async getLessonProgressByCourse(
    userId: number,
    courseId: number,
  ): Promise<LessonProgress[]> {
    const courseLessons = await this.getLessonsByCourse(courseId);
    const lessonIds = courseLessons.map((l) => l.id);
    if (lessonIds.length === 0) return [];

    const allProgress = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, userId),
          inArray(lessonProgress.lessonId, lessonIds),
        ),
      );
    return allProgress;
  }

  async markLessonComplete(
    userId: number,
    lessonId: number,
  ): Promise<LessonProgress> {
    const existing = await this.getLessonProgress(userId, lessonId);
    if (existing) {
      const [updated] = await db
        .update(lessonProgress)
        .set({ completed: true, completedAt: new Date() })
        .where(eq(lessonProgress.id, existing.id))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(lessonProgress)
      .values({ userId, lessonId, completed: true, completedAt: new Date() })
      .returning();
    return created;
  }

  async getCertificates(
    userId: number,
  ): Promise<(Certificate & { course: Course })[]> {
    const rows = await db
      .select()
      .from(certificates)
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.userId, userId))
      .orderBy(desc(certificates.issuedAt));

    return rows.map((r) => ({ ...r.certificates, course: r.courses }));
  }

  async createCertificate(
    userId: number,
    courseId: number,
  ): Promise<Certificate> {
    const [created] = await db
      .insert(certificates)
      .values({ userId, courseId })
      .returning();
    return created;
  }

  async getCertificateCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(certificates);
    return result.count;
  }
}

export const storage = new DatabaseStorage();
