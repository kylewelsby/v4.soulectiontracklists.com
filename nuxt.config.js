const SITE_TITLE = 'Soulection'
const SITE_DESCRIPTION =
  'We are a genre, a community and artist collective bringing visibility to meaningful music and curating memorable experiences. The Sound of Tomorrow.'
export default {
  ssr: true,
  target: 'server',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://plausible.io' },
      {
        rel: 'dns-prefetch',
        href:
          process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      },
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
      },
    ],
  },
  publicRuntimeConfig: {
    paginate: 50,
    baseURL: process.env.BASE_URL || 'http://localhost:3000/',
    supabase: {
      url: process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      anonKey:
        process.env.NUXT_ENV_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    },
    profileId: 'QiEFFErt688',
    links: {
      statusPage: 'https://stats.uptimerobot.com/7X44gHmrMK',
      discord: 'https://discord.gg/soulection',
    },
    tagNames: ['solo', 'takeover', 'discord', 'guest', 'interview'],
  },
  router: {
    // trailingSlash: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  tailwindcss: {
    jit: true,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/supabase.js',
    { ssr: false, src: '~/plugins/v-calendar.js' },
    { src: '~/plugins/v-tooltip.js' },
    { ssr: false, src: '~/plugins/v-marquee-text.js' },
    { src: '~/plugins/xdn-prefetch.js' },
    { src: '~/plugins/v-json-ld.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@xdn/nuxt/module',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/markdownit',
    'nuxt-i18n',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    `@nuxtjs/sentry`,
  ],

  serverMiddleware: [
    { path: '/api/supabase', handler: '~/server-middleware/supabase.mjs' },
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/icon.png',
      plugin: false,
    },
    meta: {
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    manifest: {
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      lang: 'en',
      display: 'browser',
      themeColor: '#111111',
    },
    workbox: {
      swURL: '/service-worker.js',
      enabled: false,
      autoRegister: false,
    },
  },
  sentry: {
    dsn:
      'https://483a226d4d914b93840454fb86e08064@o175539.ingest.sentry.io/5677392',
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
    provider: 'twicpics',
    cloudinary: {
      baseURL: 'https://firebase.soulectiontracklists.com/cdn/image',
    },
    twicpics: {
      baseURL: 'https://dy2wnrva.twic.pics',
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
  hooks: {
    'content:file:beforeInsert': async (document, database) => {},
  },
}
