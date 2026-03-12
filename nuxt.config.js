const SITE_TITLE = 'Soulection'
const SITE_DESCRIPTION =
  'We are a genre, a community and artist collective bringing visibility to meaningful music and curating memorable experiences. The Sound of Tomorrow.'
export default {
  ssr: true,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      const siteTitle = 'Soulection'
      return titleChunk ? `${titleChunk} | ${siteTitle}` : siteTitle
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: SITE_DESCRIPTION,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/svg', href: '/favicon.svg' },
      { rel: 'dns-prefetch', href: 'https://plausible.io' },
      { rel: 'dns-prefetch', href: 'https://cdn.soulectiontracklists.com' },
      { rel: 'dns-prefetch', href: 'https://o175539.ingest.sentry.io' },
      { rel: 'dns-prefetch', href: 'https://w.soundcloud.com' },
      { rel: 'dns-prefetch', href: 'https://api-widget.soundcloud.com' },
      { rel: 'dns-prefetch', href: 'https://widget.sndcdn.com' },
    ],
    script: [
      {
        src: 'https://plausible.io/js/plausible.outbound-links.js',
        'data-domain': 'soulectiontracklists.com',
        async: true,
        defer: true,
      }
    ],
    htmlAttrs: {
      class: 'dark',
    },
    bodyAttrs: {
      class: 'min-h-screen dark:bg-black',
    },
  },
  loading: {
    color: '#fff',
    height: '5px',
  },
  publicRuntimeConfig: {
    paginate: 50,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    profileId: 'QiEFFErt688',
    cdnUrl: 'https://cdn.soulectiontracklists.com/',
    links: {
      statusPage: 'https://stats.uptimerobot.com/7X44gHmrMK',
      discord: 'https://discord.gg/soulection',
    },
    socials: [
      {
        platform: 'instagram',
        href: 'https://www.instagram.com/soulection/',
      },
      {
        platform: 'twitter',
        href: 'https://twitter.com/soulection',
      },
      {
        platform: 'youtube',
        href: 'https://youtube.com/soulection/',
      },
      {
        platform: 'soundcloud',
        href: 'https://soundcloud.com/soulection',
      },
      {
        platform: 'discord',
        href: 'https://discord.gg/soulection',
      },
      {
        platform: 'twitch',
        href: 'https://twitch.com/soulection/',
      },
    ],
    tagNames: [
      'soulection-radio',
      'takeover',
      // 'solo',
      'guest',
      // 'interview',
      'discord',
    ],
    homepageTagNames: [
      15, // 'soulection-radio',
      19, // `all dayer`
    ],
  },
  router: {
    // trailingSlash: true,
  },
  generate: {
    fallback: true,
    crawler: false,
    routes() {
      const fs = require('fs')
      const path = require('path')
      const dataDir = path.resolve(__dirname, 'static', 'data')
      const routes = []

      // Show pages (paginated)
      const showsDir = path.join(dataDir, 'shows')
      if (fs.existsSync(showsDir)) {
        const pageFiles = fs.readdirSync(showsDir).filter(f => f.startsWith('page-'))
        pageFiles.forEach(f => {
          const pageNum = f.replace('page-', '').replace('.json', '')
          if (pageNum !== '1') {
            routes.push(`/tracklists/page/${pageNum}`)
          }
        })
        // Individual show slugs
        const slugFiles = fs.readdirSync(showsDir).filter(f => !f.startsWith('page-') && f.endsWith('.json') && f !== 'index.json')
        slugFiles.forEach(f => {
          const slug = f.replace('.json', '')
          routes.push(`/tracklists/${slug}`)
        })
      }

      // Artist and track pages are NOT pre-rendered to stay under
      // Cloudflare's 20k page limit. They load client-side via
      // the SPA fallback (404.html).

      // Album IDs
      const recordsIndex = path.join(dataDir, 'records', 'index.json')
      if (fs.existsSync(recordsIndex)) {
        const albums = JSON.parse(fs.readFileSync(recordsIndex, 'utf-8'))
        albums.forEach(a => routes.push(`/records/${a.id}`))
      }

      // Tag type pages
      const tagNames = ['soulection-radio', 'takeover', 'guest', 'discord']
      tagNames.forEach(tag => routes.push(`/tracklists/t/${tag}`))

      // Record type pages
      const byTypeDir = path.join(dataDir, 'records', 'by-type')
      if (fs.existsSync(byTypeDir)) {
        fs.readdirSync(byTypeDir).forEach(f => {
          if (f.endsWith('.json')) {
            routes.push(`/records/t/${f.replace('.json', '')}`)
          }
        })
      }

      return routes
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  tailwindcss: {
    jit: true,
  },

  colorMode: {
    classSuffix: '',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/v-tooltip.js' },
    { src: '~/plugins/v-json-ld.js' },
    { src: '~/plugins/f-formatted-date.js' },
    { src: '~/plugins/static-data.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/markdownit',
    'nuxt-i18n',
    // '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/svg',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/maskable_icon.png',
      plugin: false,
    },
    meta: {
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      theme_color: '#ffffff',
    },
    manifest: {
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      lang: 'en',
      display: 'Standalone',
      theme_color: '#ffffff',
      background_color: '#151515',
    },
  },
  sentry: {
    // publishRelease: true,
    dsn: 'https://483a226d4d914b93840454fb86e08064@o175539.ingest.sentry.io/5677392',
    config: {
      environment: process.env.NODE_ENV || 'development',
    },
    tracesSampleRate: 1.0,
    vueOptions: {
      tracing: true,
      tracingOptions: {
        hooks: ['mount', 'update'],
        timeout: 2000,
        trackComponents: true,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      preset: {
        features: {
          'focus-within-pseudo-class': false,
        },
      },
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
  },
  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: 'https://cdn.soulectiontracklists.com/',
    },
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    // breaks: true,
    html: true,
    runtime: true,
  },
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en-us'],
    defaultLocale: 'en-us',
    useRedirectCookie: false,
    detectBrowserLanguage: {
      cookieKey: null,
      useCookie: false,
    },
    vueI18n: {
      messages: {
        'en-us': require('./locale/en-us.json'),
      },
    },
  },
  // hooks: {
  //   'content:file:beforeInsert': async (document, database) => { },
  // }
}
