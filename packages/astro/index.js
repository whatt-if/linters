module.exports = {
  extends: [
    '@whatt-if/react-ts-linter',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
  ],
  plugins: ['astro'],
  parserOptions: {
    extraFileExtensions: ['.astro'],
    project: './tsconfig.eslint.json',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
  rules: {
    'astro/no-unused-define-vars-in-style': 'warn',
    'astro/no-set-html-directive': 'error',
    'astro/no-exports-from-components': 'error',

    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          ['/^react/', '/^astro/'],
          'module',
          '/^@/',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
  },
};
