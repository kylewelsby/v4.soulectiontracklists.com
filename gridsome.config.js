// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const BASE_DIR = process.env.FULL_SITE ? './content-full' : './content'

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss"
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Episode',
        baseDir: BASE_DIR,
        path: './episodes/*.md',
        index: '_index'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Track',
        baseDir: BASE_DIR,
        path: './artists/**/tracks/*.md',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Artist',
        baseDir: BASE_DIR,
        path: './artists/*/*.md',
        index: '_index'
      }
    },
  ],
}
