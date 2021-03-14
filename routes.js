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
    staleWhileRevalidateSeconds: 60 * 60,
  },
}
const SVG = {
const routes = new Router()
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .match('/api/supabase/:path/', ({ cache, renderWithApp }) => {
    renderWithApp()
  })
  .match('/admin/', ({ cache }) =>
    cache({
      edge: false,
    })
  )
  .match('/admin/posts/', ({ cache }) =>
    cache({
      edge: false,
    })
  )
  .get('/', ({ cache }) => cache(HTML))
  .get('/:slug', ({ cache }) => cache(HTML))
  .get('/episodes/:slug', ({ cache }) => cache(HTML))
  .get('/artists/:artist-slug/', ({ cache }) => cache(HTML))
  .get('/artists/:artist-slug/tracks/:track-slug/', ({ cache }) => cache(HTML))
  .get('/signup', ({ redirect }) => redirect('/get-notified/', 301))
  .get('/discography', ({ redirect }) => redirect('/records/', 301))
  .get('/white-label', ({ redirect }) => redirect('/records/white-label/', 301))
  .get('/black-label', ({ redirect }) => redirect('/records/black-label/', 301))
  .get('/singles', ({ redirect }) => redirect('/records/singles/', 301))
  .get('/playlist', ({ redirect }) => redirect('/records/playlists/', 301))
  .get('/chill', ({ redirect }) =>
    redirect('/episodes/soulection-and-chill-2018/', 301)
  )
  .get('/radio', ({ redirect }) => redirect('/episodes/', 301))
  .get('/privacy', ({ redirect }) => redirect('/privacy-policy/', 301))
  .prerender([{ path: '/' }, { path: '/episodes/' }])
  .use(nuxtRoutes)
module.exports = routes
