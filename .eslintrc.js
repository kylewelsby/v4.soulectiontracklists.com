module.exports = {
  root: true,
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  plugins: ['cypress'],
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
}
