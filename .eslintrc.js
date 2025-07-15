module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
}
