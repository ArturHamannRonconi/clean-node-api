export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/presentation/controllers/*Controller.ts',
    '<rootDir>/src/domain/useCases/*UseCase.ts'
  ],
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src']
}
