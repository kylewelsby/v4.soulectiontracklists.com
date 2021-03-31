import Vue from 'vue'
export default Vue.component('SiteButton', {
  inheritAttrs: false,
  computed: {
    localTag() {
      if (this.$attrs.href) {
        return 'a'
      } else if (this.$attrs.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    },
    localAttrs() {
      if (this.localTag === 'a') {
        return Object.assign(
          {
            rel: 'noopener',
            target: '_blank',
          },
          this.$attrs
        )
      } else if (this.localTag === 'nuxt-link') {
        return Object.assign({ to: '#' }, this.$attrs)
      } else {
        return this.$attrs
      }
    },
  },
  render(h) {
    return h(
      this.localTag,
      {
        class:
          'site-button bg-black dark:bg-white dark:text-black rounded-full text-white px-6 py-2 font-medium text-sm flex flex-row justify-center items-center',
        props: Object.assign(this.localAttrs, this.$props),
        on: this.$listeners,
        attrs: this.localAttrs,
      },
      this.$slots.default
    )
  },
})
