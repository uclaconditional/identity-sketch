module.exports = {
  parser: "babel-eslint",
  extends: [
    'airbnb',
  ],
  ecmaFeatures: {
    "jsx": true,
    "modules":true,
    "arrowFunctions":true,
    "classes":true,
    "spread":true,
  },
  rules: {
    "no-param-reassign": [2, { "props": false }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }]
  }
}
