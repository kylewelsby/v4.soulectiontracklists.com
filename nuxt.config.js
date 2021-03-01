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
      { rel: 'dns-prefetch', href: 'https://w.soundcloud.com' },
      { rel: 'dns-prefetch', href: 'https://api-widget.soundcloud.com' },
      { rel: 'dns-prefetch', href: 'https://widget.sndcdn.com' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  publicRuntimeConfig: {
    paginate: 50,
    supabase: {
      url: process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      anonKey:
        process.env.NUXT_ENV_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    },
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

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/supabase.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
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
    '@xdn/nuxt/module',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
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
      enabled: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
  },
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://firebase.soulectiontracklists.com/cdn/image',
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
    detectBrowserLanguage: {
      useCookie: true,
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
