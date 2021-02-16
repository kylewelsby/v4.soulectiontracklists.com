'use strict'
require('dotenv').config()

module.exports = {
  connector: '@xdn/nuxt',
  backends: {},
  includeNodeModules: true,
  includeFiles: {
    'content/': true,
    'plugins/': true,
    './.env': './.env',
  },
}
