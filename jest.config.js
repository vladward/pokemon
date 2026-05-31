export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/shared/config/jest/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^next-intl$': '<rootDir>/src/shared/config/jest/__mocks__/next-intl.ts',
    '^next/cache$': '<rootDir>/src/shared/config/jest/__mocks__/next-cache.ts',
    '^next/headers$': '<rootDir>/src/shared/config/jest/__mocks__/next-headers.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/src/shared/config/jest/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/', '<rootDir>/.next/'],
  testMatch: ['<rootDir>/src/**/*(*.)@(test|spec).(ts|tsx)'],
};
