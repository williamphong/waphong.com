import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { 
    languageOptions: { 
      globals: globals.browser, 
      parserOptions: {
        ecmaVersion: 2021,
        ecmaFeatures: { jsx: true }, // Enables JSX globally
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.jsx', '**/*.tsx'], // Specifies both .jsx and .tsx files
  },
  pluginReactConfig,
];
