'use strict'
require('dotenv').config()

module.exports = {
  connector: '@edgio/nuxt',
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
    'gcloud-key.json': true,
  },
  prerenderConcurrency: 200,
}
