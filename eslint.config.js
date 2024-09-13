const typeScriptEsLintPlugin = require('@typescript-eslint/eslint-plugin');
const typeScriptEsLintParser = require('@typescript-eslint/parser');
const esLintConfigPrettier = require('eslint-config-prettier');
const sonarjs = require('eslint-plugin-sonarjs');
const { FlatCompat } = require('@eslint/eslintrc');

// Translate ESLintRC-style configs into flat configs.
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
});

module.exports = [
  {
    ignores: [
      '**/dist/*',
      'node_modules/*',
      '**/*.json',
      '**/*.config.ts',
      '**/*.js',
      '**/.next/*',
      '**/*.config.mjs',
    ],
  },
  // ESLint recommended flat config.
  {
    rules: {
      // Add the rules from 'eslint:recommended'
      'for-direction': 'error',
      'getter-return': ['error', { allowImplicit: true }],
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-constant-condition': 'warn',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-obj-calls': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-useless-backreference': 'error',
      'require-atomic-updates': 'error',
      'use-isnan': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
    },
  },

  // Flat config for turning off all rules that are unnecessary or might conflict with Prettier.
  esLintConfigPrettier,

  // Flat config for SonarJS rules.
  ...compat.config({
    plugins: ['sonarjs'],
    rules: {
      ...sonarjs.configs.recommended.rules,
    },
  }),

  // Flat config for ESLint rules.
  {
    rules: {
      camelcase: ['error', { ignoreDestructuring: true }],
    },
  },

  // Override for TypeScript files.
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typeScriptEsLintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typeScriptEsLintPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
    },
  },
];
