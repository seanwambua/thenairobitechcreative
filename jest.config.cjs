module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/lib/prisma$': '<rootDir>/src/lib/__mocks__/prisma.ts',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!next-auth/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
