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
      const classes = 'text-opacity-100 font-semibold opacity-90'
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
        class: `py-4 px-6 border-b-2 border-opacity-50 sm:border-0 sm:py-2 sm:px-3 text-center text-xl sm:text-xs text-black sm:text-opacity-50 font-header sm:font-sans hover:underline hover:text-opacity-75 active:text-opacity-100 dark:text-white sm:dark:text-opacity-50 dark:hover:text-opacity-75 dark:active:text-opacity-100 ${this.activeClasses}`,
        on: this.$listeners,
        attrs: this.localAttrs,
        props: Object.assign(this.localAttrs, this.$props),
      },
      this.$slots.default
    )
  },
})
