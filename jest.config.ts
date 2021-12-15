export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/presentation/controllers/*Controller.ts',
    '<rootDir>/src/presentation/utils/*.ts',
    '<rootDir>/src/data/useCases/**/*UseCase.ts'
  ],
  preset: '@shelf/jest-mongodb',
  testMatch: ['**/*.(spec|test).ts'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  roots: ['<rootDir>/src']
}
