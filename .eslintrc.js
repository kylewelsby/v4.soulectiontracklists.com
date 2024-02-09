module.exports = {
  root: true,
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ["cypress/*"],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
}
