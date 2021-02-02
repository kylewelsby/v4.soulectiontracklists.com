// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// const BASE_DIR = process.env.FULL_SITE ? "./content-full" : "./content";
const BASE_DIR = process.env.CONTENT_DIR || "./content"

module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss"
    },
    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: [
          'en-us'
        ],
        pathAliases: {
          // 'en-us': 'en',
        },
        fallbackLocale: 'en-us', // fallback language
        defaultLocale: 'en-us', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: false, // rewrite default locale, default: true
        messages: {
          'en-us': require('./src/locale/en-us.json')
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Episode",
        baseDir: BASE_DIR,
        path: "./episodes/*.md",
        index: [
          "_index.md"
        ]
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Track",
        baseDir: BASE_DIR,
        path: "./artists/**/tracks/*.md"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Artist",
        baseDir: BASE_DIR,
        path: "./artists/*/*.md",
        index: "_index"
      }
    },
    {
      use: 'gridsome-plugin-image-cdn',
      options: {
        cdn: {
          baseUrl: "https://firebase.soulectiontracklists.com/cdn/image",
          preset: 'cloudinary',
          imagePrefix: '/'
        },
        types: [
          {
            typeName: 'Track',
            sourceField: 'artwork'
          }
        ]
      }
    },
    {
      use: 'gridsome-plugin-image-cdn',
      options: {
        cdn: {
          baseUrl: "https://firebase.soulectiontracklists.com/cdn/image",
          preset: 'cloudinary',
          imagePrefix: '/'
        },
        types: [
          {
            typeName: 'Episode',
            sourceField: 'artwork'
          }
        ]
      }
    }
  ]
};
