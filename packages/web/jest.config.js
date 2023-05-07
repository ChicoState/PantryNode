module.exports = {
  // other configurations...
  testPathIgnorePatterns: [
    "/node_modules/",
    "react-app-env.d.ts",
    "/src/__tests__/mock/",
    "/src/interface/*",
    "/src/interface/Stock/*",
    "src/store/ActionCreators.ts",
    "src/store/ActionTypes.ts",
  ],
  coverageReporters: ["html", "text"],
  testEnvironment: "jsdom",
  forceExit: true,
  runInBand: true,
  watchAll: false,
};
