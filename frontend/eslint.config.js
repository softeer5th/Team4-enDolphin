import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
      '@import': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error', {
          prefer: 'type-imports',
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@import/no-duplicates': 'error',
      
      // Formatting
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@stylistic/block-spacing': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/brace-style': 'error',
      '@stylistic/func-call-spacing': 'error',
      '@stylistic/key-spacing': 'error',
      '@stylistic/member-delimiter-style': 'error',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/semi': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-before-function-paren': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/max-len': ['error', { code: 100, ignoreUrls: true }],
      '@stylistic/jsx-sort-props': 'error',
      '@stylistic/array-bracket-newline': 'error',
      'react/jsx-no-duplicate-props': 'error',

      // Possible Problems
      'array-callback-return': ['error', { checkForEach: true }],
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error',
      'no-dupe-keys': 'error',
      // 'no-duplicate-imports': 'error',
      'no-fallthrough': 'error',
      'no-invalid-regexp': 'error',
      'no-undef': 'error',
      'no-unsafe-negation': 'error',
      'require-atomic-updates': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',

      // Suggestions
      'arrow-body-style': 'error',
      // "complexity": ["error", 2],
      'default-case': 'error',
      'max-depth': ['error', 2],
      'max-lines-per-function': ['error', { max: 40 }],
      'max-nested-callbacks': 'error',
      'no-console': 'error',
      'no-empty-function': 'error',
      'no-label-var': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
      'no-restricted-syntax': [
        'error',
        'FunctionExpression',
        'FunctionDeclaration',
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable',
          leadingUnderscore: 'allow',
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'interface',
        },
        {
          format: ['PascalCase'],
          selector: 'typeAlias',
        },
      ],
    },
  },
);
