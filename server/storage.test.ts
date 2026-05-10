import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DatabaseStorage } from './storage';
import { db } from './db';
import { users } from '@shared/schema';

// Mock drizzle database methods
vi.mock('./db', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}));

// Helper to mock chainable query building
const createQueryBuilderMock = () => {
  const mock: any = {};
  let resolveValue: any = null;

  mock.from = vi.fn().mockReturnValue(mock);
  mock.where = vi.fn().mockReturnValue(mock);
  mock.orderBy = vi.fn().mockReturnValue(mock);
  mock.values = vi.fn().mockReturnValue(mock);
  mock.set = vi.fn().mockReturnValue(mock);
  mock.returning = vi.fn().mockReturnValue(mock);

  mock.mockResolvedValue = (val: any) => {
    resolveValue = val;
    return mock;
  };

  mock.then = (resolve: any) => {
    resolve(resolveValue);
  };

  return mock;
};

describe('DatabaseStorage', () => {
  let storage: DatabaseStorage;
  let mockQuery: any;

  beforeEach(() => {
    vi.clearAllMocks();
    storage = new DatabaseStorage();
    mockQuery = createQueryBuilderMock();

    // Set default behavior to use our chainable mock
    (db.select as any).mockReturnValue(mockQuery);
    (db.insert as any).mockReturnValue(mockQuery);
    (db.update as any).mockReturnValue(mockQuery);
    (db.delete as any).mockReturnValue(mockQuery);
  });

  describe('getUser', () => {
    it('should return a user by id when found', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      mockQuery.mockResolvedValue([mockUser]);

      const user = await storage.getUser(1);

      expect(user).toEqual(mockUser);
      expect(db.select).toHaveBeenCalled();
      expect(mockQuery.from).toHaveBeenCalledWith(users);
      // It calls where(eq(users.id, 1)), we verify 'where' was called
      expect(mockQuery.where).toHaveBeenCalled();
    });

    it('should return undefined when user is not found', async () => {
      mockQuery.mockResolvedValue([]);

      const user = await storage.getUser(999);

      expect(user).toBeUndefined();
      expect(db.select).toHaveBeenCalled();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email when found', async () => {
      const mockUser = { id: 2, name: 'Email User', email: 'hello@example.com' };
      mockQuery.mockResolvedValue([mockUser]);

      const user = await storage.getUserByEmail('hello@example.com');

      expect(user).toEqual(mockUser);
      expect(db.select).toHaveBeenCalled();
      expect(mockQuery.from).toHaveBeenCalledWith(users);
      expect(mockQuery.where).toHaveBeenCalled();
    });

    it('should return undefined when user email is not found', async () => {
      mockQuery.mockResolvedValue([]);

      const user = await storage.getUserByEmail('notfound@example.com');

      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a user and generate initials from name', async () => {
      const insertData = { name: 'John Doe', email: 'john@doe.com', password: 'pass', role: 'student' as const };
      const returnedUser = { id: 3, ...insertData, avatarInitials: 'JD' };

      mockQuery.mockResolvedValue([returnedUser]);

      const user = await storage.createUser(insertData);

      expect(user).toEqual(returnedUser);
      expect(db.insert).toHaveBeenCalledWith(users);
      // We know it modifies the inserted data to add initials
      expect(mockQuery.values).toHaveBeenCalledWith({ ...insertData, avatarInitials: 'JD' });
      expect(mockQuery.returning).toHaveBeenCalled();
    });

    it('should generate initials correctly for single name', async () => {
      const insertData = { name: 'Admin', email: 'admin@admin.com', password: 'pass', role: 'admin' as const };
      const returnedUser = { id: 4, ...insertData, avatarInitials: 'A' };

      mockQuery.mockResolvedValue([returnedUser]);

      const user = await storage.createUser(insertData);

      expect(user).toEqual(returnedUser);
      expect(mockQuery.values).toHaveBeenCalledWith({ ...insertData, avatarInitials: 'A' });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users sorted by createdAt desc', async () => {
      const mockUsers = [
        { id: 2, name: 'B', createdAt: new Date('2023-02-01') },
        { id: 1, name: 'A', createdAt: new Date('2023-01-01') }
      ];
      mockQuery.mockResolvedValue(mockUsers);

      const usersList = await storage.getAllUsers();

      expect(usersList).toEqual(mockUsers);
      expect(db.select).toHaveBeenCalled();
      expect(mockQuery.from).toHaveBeenCalledWith(users);
      expect(mockQuery.orderBy).toHaveBeenCalled(); // Should check desc(users.createdAt)
    });
  });
});
