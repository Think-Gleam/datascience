import { test, mock, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { DatabaseStorage } from "./storage";
import { db } from "./db";

describe("DatabaseStorage - User Operations", () => {
  let storage: DatabaseStorage;

  beforeEach(() => {
    storage = new DatabaseStorage();
  });

  it("getUser should return user by id", async (t) => {
    const fakeUser = { id: 1, email: "test@example.com" };

    const mockWhere = t.mock.fn(async () => [fakeUser]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const user = await storage.getUser(1);

    assert.deepEqual(user, fakeUser);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("getUserByEmail should return user by email", async (t) => {
    const fakeUser = { id: 1, email: "test@example.com" };

    const mockWhere = t.mock.fn(async () => [fakeUser]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const user = await storage.getUserByEmail("test@example.com");

    assert.deepEqual(user, fakeUser);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("createUser should insert user and return it", async (t) => {
    const insertData = { name: "John Doe", email: "john@example.com", password: "pwd", role: "student" as const };
    const fakeUser = { id: 1, ...insertData, avatarInitials: "JD" };

    const mockReturning = t.mock.fn(async () => [fakeUser]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const user = await storage.createUser(insertData);

    assert.deepEqual(user, fakeUser);
    assert.equal(mockValues.mock.callCount(), 1);

    const calledValues = mockValues.mock.calls[0].arguments[0];
    assert.equal(calledValues.avatarInitials, "JD");
  });

  it("getAllUsers should return all users ordered by creation date", async (t) => {
    const fakeUsers = [
      { id: 1, email: "u1@test.com" },
      { id: 2, email: "u2@test.com" }
    ];

    const mockOrderBy = t.mock.fn(async () => fakeUsers);
    const mockFrom = t.mock.fn(() => ({ orderBy: mockOrderBy }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const result = await storage.getAllUsers();
    assert.deepEqual(result, fakeUsers);
    assert.equal(mockOrderBy.mock.callCount(), 1);
  });

  it("getUserCount should return the number of users", async (t) => {
    const mockFrom = t.mock.fn(async () => [{ count: 42 }]);
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const count = await storage.getUserCount();
    assert.equal(count, 42);
    assert.equal(mockFrom.mock.callCount(), 1);
  });
});

describe("DatabaseStorage - Course Operations", () => {
  let storage: DatabaseStorage;

  beforeEach(() => {
    storage = new DatabaseStorage();
  });

  it("getCourses should return all courses or only published", async (t) => {
    const fakeCourses = [{ id: 1, title: "Course 1", published: true }];

    // Mock for publishedOnly = false
    const mockOrderByAll = t.mock.fn(async () => fakeCourses);
    const mockFromAll = t.mock.fn(() => ({ orderBy: mockOrderByAll }));
    t.mock.method(db, "select", () => ({ from: mockFromAll }));

    let result = await storage.getCourses();
    assert.deepEqual(result, fakeCourses);
    assert.equal(mockOrderByAll.mock.callCount(), 1);

    t.mock.restoreAll();

    // Mock for publishedOnly = true
    const mockOrderByPublished = t.mock.fn(async () => fakeCourses);
    const mockWherePublished = t.mock.fn(() => ({ orderBy: mockOrderByPublished }));
    const mockFromPublished = t.mock.fn(() => ({ where: mockWherePublished }));
    t.mock.method(db, "select", () => ({ from: mockFromPublished }));

    result = await storage.getCourses(true);
    assert.deepEqual(result, fakeCourses);
    assert.equal(mockOrderByPublished.mock.callCount(), 1);
  });

  it("getCourse should return course by id", async (t) => {
    const fakeCourse = { id: 1, title: "Course 1" };

    const mockWhere = t.mock.fn(async () => [fakeCourse]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const course = await storage.getCourse(1);

    assert.deepEqual(course, fakeCourse);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("createCourse should insert course and return it", async (t) => {
    const insertData = { title: "New Course", description: "Desc", level: "beginner" as const, published: false };
    const fakeCourse = { id: 1, ...insertData, studentCount: 0 };

    const mockReturning = t.mock.fn(async () => [fakeCourse]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const course = await storage.createCourse(insertData);

    assert.deepEqual(course, fakeCourse);
    assert.equal(mockValues.mock.callCount(), 1);
  });

  it("updateCourse should update course and return it", async (t) => {
    const updateData = { title: "Updated Course" };
    const fakeCourse = { id: 1, title: "Updated Course" };

    const mockReturning = t.mock.fn(async () => [fakeCourse]);
    const mockWhere = t.mock.fn(() => ({ returning: mockReturning }));
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    const course = await storage.updateCourse(1, updateData);

    assert.deepEqual(course, fakeCourse);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("deleteCourse should delete course", async (t) => {
    const mockWhere = t.mock.fn(async () => {});
    t.mock.method(db, "delete", () => ({ where: mockWhere }));

    await storage.deleteCourse(1);

    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("getCourseCount should return the number of courses", async (t) => {
    const mockFrom = t.mock.fn(async () => [{ count: 10 }]);
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const count = await storage.getCourseCount();
    assert.equal(count, 10);
    assert.equal(mockFrom.mock.callCount(), 1);
  });
});

describe("DatabaseStorage - Module & Lesson Operations", () => {
  let storage: DatabaseStorage;

  beforeEach(() => {
    storage = new DatabaseStorage();
  });

  it("getModules should return modules by course id", async (t) => {
    const fakeModules = [{ id: 1, title: "Module 1" }];
    const mockOrderBy = t.mock.fn(async () => fakeModules);
    const mockWhere = t.mock.fn(() => ({ orderBy: mockOrderBy }));
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const modules = await storage.getModules(1);
    assert.deepEqual(modules, fakeModules);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("createModule should insert module and return it", async (t) => {
    const insertData = { courseId: 1, title: "New Mod", description: "Desc", orderNumber: 1 };
    const fakeModule = { id: 1, ...insertData };
    const mockReturning = t.mock.fn(async () => [fakeModule]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const module = await storage.createModule(insertData);
    assert.deepEqual(module, fakeModule);
    assert.equal(mockValues.mock.callCount(), 1);
  });

  it("updateModule should update module and return it", async (t) => {
    const updateData = { title: "Updated Mod" };
    const fakeModule = { id: 1, title: "Updated Mod" };
    const mockReturning = t.mock.fn(async () => [fakeModule]);
    const mockWhere = t.mock.fn(() => ({ returning: mockReturning }));
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    const module = await storage.updateModule(1, updateData);
    assert.deepEqual(module, fakeModule);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("deleteModule should delete module and its lessons", async (t) => {
    const mockWhere = t.mock.fn(async () => {});
    t.mock.method(db, "delete", () => ({ where: mockWhere }));

    await storage.deleteModule(1);
    assert.equal(mockWhere.mock.callCount(), 2); // One for lessons, one for modules
  });

  it("getLessons should return lessons by module id", async (t) => {
    const fakeLessons = [{ id: 1, title: "Lesson 1" }];
    const mockOrderBy = t.mock.fn(async () => fakeLessons);
    const mockWhere = t.mock.fn(() => ({ orderBy: mockOrderBy }));
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const lessons = await storage.getLessons(1);
    assert.deepEqual(lessons, fakeLessons);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("getLesson should return lesson by id", async (t) => {
    const fakeLesson = { id: 1, title: "Lesson 1" };
    const mockWhere = t.mock.fn(async () => [fakeLesson]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const lesson = await storage.getLesson(1);
    assert.deepEqual(lesson, fakeLesson);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("getLessonsByCourse should return all lessons for a course", async (t) => {
    const fakeModules = [{ id: 1 }, { id: 2 }];
    const fakeLessonsMod1 = [{ id: 1, title: "L1" }];
    const fakeLessonsMod2 = [{ id: 2, title: "L2" }];

    t.mock.method(storage, "getModules", async () => fakeModules as any[]);

    const mockGetLessons = t.mock.method(storage, "getLessons", async (modId: number) => {
      if (modId === 1) return fakeLessonsMod1 as any[];
      if (modId === 2) return fakeLessonsMod2 as any[];
      return [];
    });

    const lessons = await storage.getLessonsByCourse(1);
    assert.deepEqual(lessons, [...fakeLessonsMod1, ...fakeLessonsMod2]);
    assert.equal(mockGetLessons.mock.callCount(), 2);
  });

  it("createLesson should insert lesson and return it", async (t) => {
    const insertData = { moduleId: 1, title: "New Lesson", content: "Cont", orderNumber: 1 };
    const fakeLesson = { id: 1, ...insertData };
    const mockReturning = t.mock.fn(async () => [fakeLesson]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const lesson = await storage.createLesson(insertData);
    assert.deepEqual(lesson, fakeLesson);
    assert.equal(mockValues.mock.callCount(), 1);
  });

  it("updateLesson should update lesson and return it", async (t) => {
    const updateData = { title: "Updated Lesson" };
    const fakeLesson = { id: 1, title: "Updated Lesson" };
    const mockReturning = t.mock.fn(async () => [fakeLesson]);
    const mockWhere = t.mock.fn(() => ({ returning: mockReturning }));
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    const lesson = await storage.updateLesson(1, updateData);
    assert.deepEqual(lesson, fakeLesson);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("deleteLesson should delete lesson", async (t) => {
    const mockWhere = t.mock.fn(async () => {});
    t.mock.method(db, "delete", () => ({ where: mockWhere }));

    await storage.deleteLesson(1);
    assert.equal(mockWhere.mock.callCount(), 1);
  });
});

describe("DatabaseStorage - Enrollment, Progress & Certificate Operations", () => {
  let storage: DatabaseStorage;

  beforeEach(() => {
    storage = new DatabaseStorage();
  });

  it("getEnrollment should return enrollment by user and course id", async (t) => {
    const fakeEnrollment = { id: 1, userId: 1, courseId: 1 };
    const mockWhere = t.mock.fn(async () => [fakeEnrollment]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const enrollment = await storage.getEnrollment(1, 1);
    assert.deepEqual(enrollment, fakeEnrollment);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("createEnrollment should insert enrollment, update course count, and return it", async (t) => {
    const insertData = { userId: 1, courseId: 1 };
    const fakeEnrollment = { id: 1, ...insertData };

    const mockReturning = t.mock.fn(async () => [fakeEnrollment]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const mockWhereUpdate = t.mock.fn(async () => {});
    const mockSetUpdate = t.mock.fn(() => ({ where: mockWhereUpdate }));
    t.mock.method(db, "update", () => ({ set: mockSetUpdate }));

    const enrollment = await storage.createEnrollment(insertData);
    assert.deepEqual(enrollment, fakeEnrollment);
    assert.equal(mockValues.mock.callCount(), 1);
    assert.equal(mockSetUpdate.mock.callCount(), 1);
  });

  it("updateEnrollmentProgress should update progress", async (t) => {
    const mockWhere = t.mock.fn(async () => {});
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    await storage.updateEnrollmentProgress(1, 50);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("completeEnrollment should mark enrollment as completed", async (t) => {
    const mockWhere = t.mock.fn(async () => {});
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    await storage.completeEnrollment(1);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("getEnrollmentCount should return enrollment count", async (t) => {
    const mockFrom = t.mock.fn(async () => [{ count: 5 }]);
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const count = await storage.getEnrollmentCount();
    assert.equal(count, 5);
    assert.equal(mockFrom.mock.callCount(), 1);
  });

  it("getLessonProgress should return lesson progress", async (t) => {
    const fakeProgress = { id: 1, userId: 1, lessonId: 1 };
    const mockWhere = t.mock.fn(async () => [fakeProgress]);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const progress = await storage.getLessonProgress(1, 1);
    assert.deepEqual(progress, fakeProgress);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("getLessonProgressByCourse should return progress for a course", async (t) => {
    const fakeLessons = [{ id: 1 }, { id: 2 }];
    const fakeProgresses = [{ id: 1, lessonId: 1 }, { id: 2, lessonId: 3 }];

    t.mock.method(storage, "getLessonsByCourse", async () => fakeLessons as any[]);

    const mockWhere = t.mock.fn(async () => fakeProgresses);
    const mockFrom = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const progress = await storage.getLessonProgressByCourse(1, 1);
    // lessonId: 1 is in fakeLessons, lessonId: 3 is not
    assert.equal(progress.length, 1);
    assert.equal(progress[0].lessonId, 1);
    assert.equal(mockWhere.mock.callCount(), 1);
  });

  it("markLessonComplete should create progress if not exists", async (t) => {
    t.mock.method(storage, "getLessonProgress", async () => undefined);

    const fakeProgress = { id: 1, userId: 1, lessonId: 1, completed: true };
    const mockReturning = t.mock.fn(async () => [fakeProgress]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const progress = await storage.markLessonComplete(1, 1);
    assert.deepEqual(progress, fakeProgress);
    assert.equal(mockValues.mock.callCount(), 1);
  });

  it("markLessonComplete should update progress if exists", async (t) => {
    const existingProgress = { id: 1, userId: 1, lessonId: 1, completed: false };
    t.mock.method(storage, "getLessonProgress", async () => existingProgress as any);

    const fakeProgress = { ...existingProgress, completed: true };
    const mockReturning = t.mock.fn(async () => [fakeProgress]);
    const mockWhere = t.mock.fn(() => ({ returning: mockReturning }));
    const mockSet = t.mock.fn(() => ({ where: mockWhere }));
    t.mock.method(db, "update", () => ({ set: mockSet }));

    const progress = await storage.markLessonComplete(1, 1);
    assert.deepEqual(progress, fakeProgress);
    assert.equal(mockSet.mock.callCount(), 1);
  });

  it("createCertificate should insert certificate and return it", async (t) => {
    const fakeCertificate = { id: 1, userId: 1, courseId: 1 };
    const mockReturning = t.mock.fn(async () => [fakeCertificate]);
    const mockValues = t.mock.fn(() => ({ returning: mockReturning }));
    t.mock.method(db, "insert", () => ({ values: mockValues }));

    const cert = await storage.createCertificate(1, 1);
    assert.deepEqual(cert, fakeCertificate);
    assert.equal(mockValues.mock.callCount(), 1);
  });

  it("getCertificateCount should return certificate count", async (t) => {
    const mockFrom = t.mock.fn(async () => [{ count: 3 }]);
    t.mock.method(db, "select", () => ({ from: mockFrom }));

    const count = await storage.getCertificateCount();
    assert.equal(count, 3);
    assert.equal(mockFrom.mock.callCount(), 1);
  });
});
