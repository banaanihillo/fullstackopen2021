module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-trailing-spaces": "error",
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true
      }
    ]
  }
}
