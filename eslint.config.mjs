import { defineConfig, globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import path from 'node:path';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/build/',
    '**/node_modules/',
    '**/dist/',
    '**/build/',
    '**/.env',
    '**/*.css',
  ]),
  {
    // где будет исполняться наш код
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ),
    // подключаем плагины.
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      prettier,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
    /* Правила для отслеживания линтером. */
    rules: {
      semi: ['warn', 'always'],
      'prettier/prettier': 'error', //  Подсвечивает ошибки из Prettier.
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-var': 'warn',
      'space-infix-ops': 'warn',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-empty': 'warn',
      'no-empty-function': 'warn',
      'no-console': 'warn',
      'require-await': 'warn',
      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
          allowSeparatedGroups: false,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-param-reassign': warn,
    },
  },
]);
