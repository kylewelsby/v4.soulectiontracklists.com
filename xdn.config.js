'use strict'
require('dotenv').config()

module.exports = {
  connector: '@xdn/nuxt',
  backends: {},
  includeNodeModules: true,
  includeFiles: {
    'content/': true,
    'plugins/': true,
    'locale/': true,
    './.env': './.env',
    'assets/': true,
    'middleware/': true,
    'server-middleware/': true,
    'store/': true,
  },
  prerenderConcurrency: 200,
}
