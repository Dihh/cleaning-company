module.exports = {
  root: true,
  env: { "jest": true, node: true, },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [],
  rules: {
    "no-async-promise-executor": "off",
  },
  "globals": {
    "process": true
  }
}
