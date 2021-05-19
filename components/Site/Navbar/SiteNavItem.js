import Vue from 'vue'
export default Vue.component('SiteNavItem', {
  inheritAttrs: false,
  computed: {
    tag() {
      if (this.$attrs.href) {
        return 'a'
      } else {
        return 'nuxt-link'
      }
    },
    localAttrs() {
      if (this.tag === 'a') {
        return Object.assign(
          {
            rel: 'noopener',
            target: '_blank',
          },
          this.$attrs
        )
      } else if (this.tag === 'nuxt-link') {
        return Object.assign({ to: '#' }, this.$attrs)
      } else {
        return this.$attrs
      }
    },
    activeClasses() {
      const classes =
        'text-opacity-100 dark:text-opacity-100 sm:dark:text-opacity-100 font-semibold border-b-2 sm:border-white border-opacity-60'
      let path
      if (this.$attrs.to) {
        if (typeof this.$attrs.to === 'string') {
          path = this.$attrs.to
        } else {
          path = this.$attrs.path
        }
        if (this.$route.fullPath.startsWith(path)) {
          if (path === '/' && this.$route.fullPath !== '/') {
            return ''
          } else {
            return classes
          }
        }
      }
      return ''
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class: `py-4 px-6 border-b-2 border-opacity-50 sm:border-transparent sm:py-2 sm:px-3 text-center text-xl sm:text-sm text-black sm:text-opacity-50 font-header sm:font-sans hover:text-opacity-80 active:text-opacity-100 dark:text-white sm:dark:text-opacity-60 dark:hover:text-opacity-75 dark:active:text-opacity-100 transition hover:border-b-2 hover:border-white hover:border-opacity-80 ${this.activeClasses}`,
        on: this.$listeners,
        attrs: this.localAttrs,
        props: Object.assign(this.localAttrs, this.$props),
      },
      this.$slots.default
    )
  },
})
