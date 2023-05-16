module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    //"/node_modules/",
    //"\\.pc/",
    // "/frontend/",
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      // Set your desired coverage thresholds here
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
