import { defineConfig } from 'eslint/config';
import next from '@next/eslint-plugin-next';
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier/flat';
import jsxa11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended, // Base JavaScript recommended rules

  {
    ...reactRecommended, // React specific configuration
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'], // TypeScript configuration
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    rules: {
      ...importPlugin.configs.errors.rules,
      ...importPlugin.configs.errors.warnings,
      '@typescript-eslint/no-unused-vars': [
        'off', // exists in generic
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@/'], // Ignore unresolved errors for @/ paths
          caseSensitive: true, // Optional: enforce case sensitivity for other imports
        },
      ],

      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'], // Common rules for all files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'jsx-a11y': jsxa11y,
      '@next/next': next,
    },

    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off', // Disable if using pages directory
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'no-unused-vars': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-role': 'warn',
    },
  },
  prettierConfig,
  {
    ignores: ['node_modules/', '.next/', 'out/', 'dist/', 'build/', '*.d.ts'],
  },
]);
