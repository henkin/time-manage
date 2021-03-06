module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    semi: 0,
    'spaced-comment': 0,
    'no-trailing-spaces': 0,
    'space-before-function-paren': 0
  },
  globals: {}
}
