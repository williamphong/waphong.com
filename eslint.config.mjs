import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.node,  }, },
  { rules: {"no-unused-vars": "warn",},},
  { ignores: [
    '.next/',
  ],},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {"@typescript-eslint/no-unused-vars": "warn",}
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
];
