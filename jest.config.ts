import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
  ],
};

export default jestConfig;
