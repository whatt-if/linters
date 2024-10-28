module.exports = {
  extends: ['@whatt-if/react-ts-linter', 'next/core-web-vitals'],
  rules: {
    'import/no-unused-modules': [
      'error',
      { unusedExports: true, ignoreExports: ['src/pages/**'] },
    ],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          ['/^react/', '/^next/'],
          'module',
          '/^@/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],

    'next/no-img-element': 'warn',
    'next/no-document-import-in-page': 'error',
    'next/no-duplicate-head': 'warn',
    'next/no-css-tags': 'warn',
    'next/no-sync-scripts': 'warn',
    'next/no-html-link-for-pages': ['error', 'src/pages'],
  },
};
