import Vue from 'vue'
export default Vue.component('SiteSubNavLink', {
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
        class:
          'py-4 px-4 flex whitespace-nowrap text-sm font-light text-black text-opacity-60 dark:text-white dark:text-opacity-60 hover:text-opacity-100 dark:hover:text-opacity-100 transition',
        on: this.$listeners,
        attrs: this.localAttrs,
        props: Object.assign(this.localAttrs, this.$props),
      },
      this.$slots.default
    )
  },
})
