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
        return Object.assign(this.$attrs, {
          rel: 'noopener',
          target: '_blank',
        })
      } else {
        return this.$attrs
      }
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class:
          'py-2 px-3 text-center text-xs text-black text-opacity-50 hover:underline hover:text-opacity-75 dark:text-white dark:text-opacity-50',
        on: this.$listeners,
        attrs: this.localAttrs,
        props: this.$props,
      },
      this.$slots.default
    )
  },
})
