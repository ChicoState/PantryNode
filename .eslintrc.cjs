module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-var-requires": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "warn",
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "error"
    }
     
};