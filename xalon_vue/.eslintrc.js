module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  // add your custom rules here
  rules: {
    'eol-last': 'error',
    'space-before-function-paren': 'error',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true } ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': true,
      'ignores': []
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],

    'indent': ['error', 2],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
}
