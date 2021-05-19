module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@vue/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // See also: https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
    '@typescript-eslint/ban-types': [
      'error',
      {
        'extendDefaults': true,
        'types': {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        'allowSingleExtends': true
      }
    ]
  }
};
