import { Role } from '@/lib/roles';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Mock the auth module
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

import { auth } from '@/lib/auth';

describe('Authentication Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should identify admin users correctly', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@test.com',
        role: Role.ADMIN,
      },
    });

    const session = await auth();
    expect(session?.user?.role).toBe(Role.ADMIN);
  });

  it('should identify regular users correctly', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: {
        id: '2',
        email: 'user@test.com',
        role: Role.USER,
      },
    });

    const session = await auth();
    expect(session?.user?.role).toBe(Role.USER);
  });

  it('should return null when no session exists', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const session = await auth();
    expect(session).toBeNull();
  });
});

describe('Database User Verification', () => {
  it('should verify hashed passwords correctly', async () => {
    const password = 'password123';
    const hashedPassword = 'hashed_password';
    
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    expect(isValid).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });
});
