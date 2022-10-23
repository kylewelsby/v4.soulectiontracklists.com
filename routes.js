// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')
const { nuxtRoutes } = require('@layer0/nuxt')

const HTML = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
}
module.exports = new Router()
  .get('/_img/:path*', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })
  // .get('/rest/:path*', ({ cache, proxy }) => {
  //   cache({
  //     edge: {
  //       maxAgeSeconds: 60 * 60 * 24,
  //       staleWhileRevalidateSeconds: 60 * 60,
  //     },
  //   })
  // })
  // .head('/rest/:path*', ({ cache, proxy }) => {
  //   // cache({
  //   //   edge: {
  //   //     maxAgeSeconds: 60 * 60 * 24,
  //   //     staleWhileRevalidateSeconds: 60 * 60,
  //   //   },
  //   // })
  // })
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .match('/_content/:slug*', ({ cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
    })
    renderWithApp()
  })
  .get('/', ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('cache-control')
    cache(HTML)
  })
  .get('/radio', ({ redirect }) =>
    redirect('/tracklists/t/soulection-radio', { statusCode: 301 })
  )
  .get('/episodes', ({ redirect }) =>
    redirect('/tracklists/', { statusCode: 301 })
  )
  .get('/episodes/', ({ redirect }) =>
    redirect('/tracklists/', { statusCode: 301 })
  )
  .get('/episodes/takeovers', ({ redirect }) =>
    redirect('/tracklists/t/takeover/', { statusCode: 301 })
  )
  .get('/episodes/takeovers', ({ redirect }) =>
    redirect('/tracklists/t/takeover/', { statusCode: 301 })
  )
  .get('/episodes/kbeach', ({ redirect }) =>
    redirect('/tracklists/t/kbeach/', { statusCode: 301 })
  )
  .get('/episodes/rinsefm', ({ redirect }) =>
    redirect('/tracklists/t/rinsefm/', { statusCode: 301 })
  )
  .get('/episodes/redbull-studios/', ({ redirect }) =>
    redirect('/tracklists/t/redbull-studios/', { statusCode: 301 })
  )
  .get('/episodes/beats1/', ({ redirect }) =>
    redirect('/tracklists/t/appleMusic/', { statusCode: 301 })
  )
  .get('/episodes/mixcloud/', ({ redirect }) =>
    redirect('/tracklists/t/mixcloud/', { statusCode: 301 })
  )
  .get('/episodes/soundcloud/', ({ redirect }) =>
    redirect('/tracklists/t/soundcloud/', { statusCode: 301 })
  )
  .get('/episodes/:slug', ({ redirect }) =>
    redirect('/tracklists/:slug/', { statusCode: 301 })
  )
  .get('/:slug', ({ removeUpstreamResponseHeader, cache }) => {
    removeUpstreamResponseHeader('cache-control')
    cache(HTML)
  })
  .get('/tracklists/:slug/', ({ cache }) => cache(HTML))
  .get('/records/', ({ cache }) => cache(HTML))
  .get('/records/:id/', ({ cache }) => cache(HTML))
  .get('/tracks/:id/', ({ cache }) => cache(HTML))
  .get('/artists/:id/', ({ cache }) => cache(HTML))
  .get('/signup', ({ redirect }) => redirect('/get-notified/', 301))
  .get('/discography', ({ redirect }) => redirect('/records/', 301))
  .get('/whitelabel', ({ redirect }) =>
    redirect('/records/t/white-label/', 301)
  )
  .get('/black-label', ({ redirect }) =>
    redirect('/records/t/black-label/', 301)
  )
  .get('/singles', ({ redirect }) => redirect('/records/t/singles/', 301))
  .get('/playlist', ({ redirect }) => redirect('/records/t/playlists/', 301))
  .get('/chill', ({ redirect }) =>
    redirect('/tracklists/soulection-and-chill-2018/', 301)
  )
  .get('/radio', ({ redirect }) => redirect('/tracklists/', 301))
  .get('/privacy', ({ redirect }) => redirect('/privacy-policy/', 301))
  .prerender([
    { path: '/' },
    { path: '/about/' },
    { path: '/records/' },
    { path: '/tracklists/' },
    { path: '/500/' },
    { path: '/submissions/' },
  ])
  .use(nuxtRoutes)
