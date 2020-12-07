function beforeInsertTrackEnhance(document, database) {
  const lastEpisodeNumber = document.episodes.slice().sort().reverse()[0]
  document.lastEpisodeNumber = lastEpisodeNumber
}

function updateDoc(database, doc) {
  const dbDoc = database.items.findOne({ path: doc.path })
  database.items.update({
    $loki: dbDoc.$loki,
    meta: dbDoc.meta,
    ...doc,
  })
}
async function afterReadyEnhanceTrack($content) {
  const database = $content.database
  const tracks = await $content('artists', { deep: true })
    .where({
      path: { $contains: '/tracks/' },
    })
    // .limit(4)
    .fetch()
  tracks.forEach(async (trackDoc) => {
    const episodeDocs = await $content('episodes', { deep: true })
      .where({
        episode: trackDoc.lastEpisodeNumber,
      })
      .fetch()
    if (episodeDocs.length) {
      const episodeDoc = episodeDocs[0]
      let cue
      episodeDoc.sessions.forEach((s) => {
        const index = s.refs.findIndex((ref) => {
          if (ref) return ref.includes(trackDoc.path.replace(/^\//, ''))
          return false
        })
        cue = s.cue[index]
      })
      trackDoc.lastPlayedAt = new Date(episodeDoc.date)
      if (cue && trackDoc.lastPlayedAt) {
        const [hours, minutes, seconds] = cue.split(':')
        trackDoc.lastPlayedAt.setHours(hours)
        trackDoc.lastPlayedAt.setMinutes(minutes)
        trackDoc.lastPlayedAt.setSeconds(seconds)
      }
      const artistRef = trackDoc.path.replace(/^\/(.+)\/tracks\/.*\.md$/, '$1')
      const artistDocs = await $content(artistRef, '/_index')
        .fetch()
        .catch(() => [])
      if (artistDocs.length) {
        const artistDoc = artistDocs[0]
        console.log(artistDoc)
        trackDoc.artist = artistDoc.title
      }
      updateDoc(database, trackDoc)
    }
  })
}

export default {
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: (titleChunk) => {
      const siteTitle = 'Soulection Tracklists'
      return titleChunk ? `${titleChunk} | ${siteTitle}` : siteTitle
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // '~/plugins/soundcloud.server', '~/plugins/soundcloud.client'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/svg',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    [
      'nuxt-i18n',
      {
        locales: ['en'],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              episode: {
                soloSession: '{tracks} tracks',
                soloSessionWithInterview: '{tracks} tracks with Interview',
                multiSession: '{tracks} tracks across {sessions} sets',
                multiSessionWithInterview:
                  '{tracks} tracks across {sessions} sets with Interview',
              },
              linkCount: 'No Links | 1 Link | {n} Links',
              tracklistAppearances:
                'No Tracklist Appearances | Played Once on Show #{number} | {n} Tracklist Appearances (last Show #{number})',
              providers: {
                amazonMusic: 'Amazon Music',
                appleMusic: 'Apple Music',
                audioMack: 'Audiomack',
                audius: 'Audius',
                bandcamp: 'Bandcamp',
                beatport: 'Beatport',
                bing: 'Bing',
                deezer: 'Deezer',
                discogs: 'Discogs',
                duckduckgo: 'DuckDuckGo',
                google: 'Google',
                googlePlayMusic: 'Google Play Music',
                lastfm: 'Last.fm',
                soundcloud: 'SoundCloud',
                spotify: 'Spotify',
                tidal: 'Tidal',
                traxsource: 'Traxsource',
                youtube: 'YouTube',
              },
            },
          },
        },
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    liveEdit: false,
    dir: './content-full/',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        ws: true,
      }
    },
  },
  serverMiddleware: [
    {
      path: '/_soundcloud',
      handler: '~/api/soundcloud.js',
    },
  ],
  generate: {
    interval: 0,
    fallback: true,
  },
  hooks: {
    'content:ready': async ($content) => {
      await afterReadyEnhanceTrack($content)
    },
    'content:file:beforeInsert': (document, database) => {
      if (document.extension === '.md' && Array.isArray(document.sessions)) {
        document.sessions.forEach(async (session) => {
          if (session.content) {
            session.content = await database.markdown.toJSON(session.content)
          }
        })
      }

      if (
        document.extension === '.md' &&
        Array.isArray(document.episodes) &&
        document.episodes.length > 0 &&
        document.path.includes('/tracks/')
      ) {
        beforeInsertTrackEnhance(document, database)
      }
    },
  },
}
