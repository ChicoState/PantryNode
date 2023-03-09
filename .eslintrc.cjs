module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/no-extra-semi": "error",
        "no-undef": "warn"
    }
};