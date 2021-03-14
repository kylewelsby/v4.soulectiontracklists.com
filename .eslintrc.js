module.exports = {
  root: true,
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['prettier', 'cypress'],
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
  },
}
