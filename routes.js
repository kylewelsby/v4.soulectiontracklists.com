// This file was added by xdn init.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')
const { nuxtRoutes } = require('@xdn/nuxt')

const HTML = {
  browser: {
    maxAgeSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
  },
}
module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/:slug', ({ cache }) => cache(HTML))
  .use(nuxtRoutes)
