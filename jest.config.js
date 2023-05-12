module.exports = {
    projects: [
        {
            displayName: 'frontend TEST',
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/frontend/__tests__/**/*.{js,jsx,ts,tsx}'],
            rootDir: '.',
            testPathIgnorePatterns: ['<rootDir>/backend'],
            moduleDirectories: ['frontend/node_modules'],
            testMatch: [
                '<rootDir>/frontend/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
                '<rootDir>/frontend/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
            ],
            transform: {
                '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
            }, setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
        },
        {
            displayName: 'backend TEST',
            testEnvironment: 'node',
            testMatch: ['<rootDir>/backend/__tests__/**/*.{js,jsx,ts,tsx}'],
            moduleDirectories: ['backend/node_modules'],
            rootDir: '.',
            //setupFilesAfterEnv: ['@types/express'],
            testMatch: [
                '<rootDir>/backend/src/**/__tests__/**/*.{ts,tsx}',
                '<rootDir>/backend/src/**/*.{spec,test}.{ts,tsx}',
            ]
        },
    ],
    collectCoverage: true,
    coverageDirectory: './docs/coverage',
    collectCoverageFrom: [
        'frontend/src/pages/**/*.{ts,tsx}',
        'frontend/src/Components/**/*.{ts,tsx}',
        'backend/src/models/*.ts',
        'backend/src/routes/*.ts',
        '!**/node_modules/**',
    ],
    coverageReporters: ['html', 'text', 'lcov'],
};
