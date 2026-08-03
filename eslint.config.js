import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'server/node_modules'] },
  {
    // Browser/React code. The Express API and the shared knowledge base run on
    // Node and are configured separately below.
    files: ['src/**/*.{js,jsx}', '*.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      // The plugin assumes React 19, which added camelCase `fetchPriority`.
      // On React 18 that spelling warns at runtime and the attribute must be
      // lowercase to reach the DOM. Runtime behaviour wins over the lint rule.
      'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
      // Internal presentational components — prop shapes come from src/data,
      // not from runtime validation. Reach for TypeScript if that changes.
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Node-side: Express server + the shared knowledge base it imports.
    files: ['server/**/*.js', 'shared/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Express identifies error handlers by arity — the 4th param must exist
      // even when unused, so allow a leading underscore to opt out.
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
