module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "no-var-requires": "off",
        "@typescript-eslint/no-var-requires": "warn",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "warn",
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "warn",
        "no-undef": "off",
        "@typescript-eslint/no-undef": "warn"
    }
};