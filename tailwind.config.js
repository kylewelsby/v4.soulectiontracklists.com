/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const SIZES = [10, 12, 32, 48, 84]
const whitelistSizes = []
SIZES.forEach((size) => {
  whitelistSizes.push(`w-${size}`)
  whitelistSizes.push(`h-${size}`)
  whitelistSizes.push(`min-w-${size}`)
  whitelistSizes.push(`min-h-${size}`)
  whitelistSizes.push(`max-w-${size}`)
  whitelistSizes.push(`max-h-${size}`)
})
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      minWidth: {
        12: '3rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      minHeight: {
        12: '3rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      maxWidth: {
        12: '3rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      maxHeight: {
        12: '3rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      colors: {
        yellow: {
          50: '#FFFCF3',
          100: '#FEFAE7',
          200: '#FEF2C2',
          300: '#FDE99D',
          400: '#FBD954',
          500: '#F9C90A',
          600: '#E0B509',
          700: '#957906',
          800: '#705A05',
          900: '#4B3C03',
        },
        gray: {
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#D8D8D8',
          300: '#C0C0C0',
          400: '#919191',
          500: '#626262',
          600: '#585858',
          700: '#3B3B3B',
          800: '#2C2C2C',
          900: '#1D1D1D',
        },
      },
      backgroundImage: (theme) => ({
        'home-records-hero':
          'linear-gradient(170deg, #ffffff, #f8f8f8, #f2f2f2)',
        // 'linear-gradient(165deg, #daebdb, #d9eada, #d7ead9, #d6e9d8, #d5e8d6, #d4e7d5, #d2e7d4, #d1e6d3);',
        'home-shows-hero':
          'linear-gradient(180deg, #151515, #121212, #101010, #0c0c0c, #080808, #040404, #000000);',
        'shows-hero':
          'linear-gradient(0deg, #151515, #121212, #101010, #0c0c0c, #080808, #040404, #000000);',
        'home-supply-hero':
          'linear-gradient(150deg, #d4ecf8, #cae9f3, #c0e7ec, #b8e4e3, #b3e0d8, #b1dccc, #b1d8bf);',
      }),
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.gray.100'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            h5: {
              color: theme('colors.white'),
            },
            h6: {
              color: theme('colors.white'),
            },

            strong: {
              color: theme('colors.white'),
            },

            code: {
              color: theme('colors.white'),
            },

            figcaption: {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: false, // process.env.NODE_ENV === 'production',
    content: [
      // 'content/**/*.md',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      // 'plugins/**/*.js',
      // 'nuxt.config.js',
    ],
    options: {
      safelist: [].concat(whitelistSizes),
    },
  },
  darkMode: 'class',
}
