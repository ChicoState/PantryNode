module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    //"/node_modules/",
    //"\\.pc/",
    // "/frontend/",
  ],
  collectCoverage: true,
  coverageDirectory: 'src/__tests__/coverage',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
